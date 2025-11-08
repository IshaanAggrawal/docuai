import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  MessageSquare,
  Menu,
  X,
  Home,
  Download,
  Search,
  Trash2,
  Copy,
  RefreshCw,
  Sparkles,
  Upload,
  FileText,
  Workflow,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  queryDocuAI,
  uploadDocumentToDocuAI,
  type ChatMessagePayload,
} from "./api/query-docuai";

type Sender = "user" | "ai" | "system";

type Message = {
  id: string;
  content: string;
  sender: Sender;
  timestamp: string;
};

type ChatSession = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

const STORAGE_KEY = "docuai.chatSessions";

const suggestedQuestions = [
  "What's the company's refund policy?",
  "How do I submit an expense report?",
  "What are the vacation day policies?",
  "Where can I find the employee handbook?",
];

const welcomeMessage =
  "Hello! I'm DocuAI, your company's AI assistant. I can help you find information from your internal documents, policies, and knowledge base. What would you like to know?";

const generateId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createWelcomeMessage = (): Message => ({
  id: generateId(),
  content: welcomeMessage,
  sender: "ai",
  timestamp: new Date().toISOString(),
});

const createSession = (): ChatSession => ({
  id: generateId(),
  title: "New chat",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [createWelcomeMessage()],
});

const toHistoryPayload = (messages: Message[]): ChatMessagePayload[] =>
  messages
    .filter((message) => message.sender !== "system")
    .map((message) => ({
      role: message.sender === "ai" ? "assistant" : message.sender,
      content: message.content,
    }));

const Chat = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window === "undefined") {
      return [createSession()];
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatSession[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Failed to read chat sessions from storage", error);
    }

    return [createSession()];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(
    sessions[0]?.id ?? ""
  );
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (!sessions.some((session) => session.id === activeSessionId)) {
      setActiveSessionId(sessions[0]?.id ?? "");
    }
  }, [sessions, activeSessionId]);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId),
    [sessions, activeSessionId]
  );

  const messagesToDisplay = useMemo(() => {
    const baseMessages = activeSession?.messages ?? [];
    if (!searchTerm) return baseMessages;
    const lower = searchTerm.toLowerCase();
    return baseMessages.filter((message) =>
      message.content.toLowerCase().includes(lower)
    );
  }, [activeSession, searchTerm]);

  const isLoading = pendingSessionId === activeSession?.id;

  const persistSessions = (updater: (sessions: ChatSession[]) => ChatSession[]) => {
    setSessions((prev) => updater(prev));
  };

  const handleSendMessage = async (optionalInput?: string) => {
    const session = activeSession ?? sessions[0];
    if (!session) return;

    const messageText = optionalInput ?? inputValue;
    if (!messageText.trim()) return;

    const historyPayload = toHistoryPayload(session.messages);

    const userMessage: Message = {
      id: generateId(),
      content: messageText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setInputValue("");
    setPendingSessionId(session.id);

    persistSessions((prev) => {
      const updatedSessions = prev.map((item) => {
        if (item.id !== session.id) return item;

        const updatedMessages = [...item.messages, userMessage];
        const firstUserMessage = item.messages.find((msg) => msg.sender === "user")
          ? item.title
          : userMessage.content.slice(0, 60);

        return {
          ...item,
          title:
            item.messages.some((msg) => msg.sender === "user")
              ? item.title
              : firstUserMessage || "New chat",
          messages: updatedMessages,
          updatedAt: userMessage.timestamp,
        };
      });

      return updatedSessions.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    });

    try {
      const { answer, sources } = await queryDocuAI(messageText, historyPayload);

      const assistantMessage: Message = {
        id: generateId(),
        content: answer,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      persistSessions((prev) => {
        const updatedSessions = prev.map((item) => {
          if (item.id !== session.id) return item;

          const updatedMessages = [...item.messages, assistantMessage];
          const metadataMessage =
            sources && sources.length > 0
              ? {
                  id: generateId(),
                  content: `Sources consulted:\n${sources
                    .map((source, index) => `• ${JSON.stringify(source)}`)
                    .join("\n")}`,
                  sender: "system" as Sender,
                  timestamp: assistantMessage.timestamp,
                }
              : null;

          const finalMessages = metadataMessage
            ? [...updatedMessages, metadataMessage]
            : updatedMessages;

          return {
            ...item,
            messages: finalMessages,
            updatedAt: assistantMessage.timestamp,
          };
        });

        return updatedSessions.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setPendingSessionId(null);
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Message copied",
      description: "Message content copied to clipboard",
    });
  };

  const handleClearHistory = () => {
    const freshSession = createSession();
    setSessions([freshSession]);
    setActiveSessionId(freshSession.id);
    setInputValue("");
    setSearchTerm("");

    toast({
      title: "Chat cleared",
      description: "Your chat history has been cleared",
    });
  };

  const handleExportChat = () => {
    const session = activeSession ?? sessions[0];
    if (!session) return;

    const chatText = session.messages
      .map((msg) => {
        const senderLabel =
          msg.sender === "user" ? "You" : msg.sender === "ai" ? "DocuAI" : "System";
        const timestamp = new Date(msg.timestamp).toLocaleString();
        return `[${timestamp}] ${senderLabel}: ${msg.content}`;
      })
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `docuai-chat-${new Date().toISOString().split("T")[0]}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Chat exported",
      description: "Your chat history has been downloaded",
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const session = activeSession ?? sessions[0];
    if (!session) return;

    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      await uploadDocumentToDocuAI(file);

      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });

      const systemMessage: Message = {
        id: generateId(),
        content: `File \"${file.name}\" has been uploaded. You can now ask questions about it.`,
        sender: "system",
        timestamp: new Date().toISOString(),
      };

      persistSessions((prev) =>
        prev.map((item) =>
          item.id === session.id
            ? {
                ...item,
                messages: [...item.messages, systemMessage],
                updatedAt: systemMessage.timestamp,
              }
            : item
        )
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to upload the file";
      toast({
        title: "Upload failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
      event.target.value = "";
    }
  };

  const handleCreateNewChat = () => {
    const newSession = createSession();
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <div className="h-screen bg-background flex">
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-80 bg-accent border-r border-border flex flex-col`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                title="Clear all chats"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search messages..."
              className="pl-9 text-sm"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className={`p-3 cursor-pointer transition-smooth border-border hover:border-primary/20 ${
                  session.id === activeSessionId ? "border-primary/50 bg-background" : ""
                }`}
                onClick={() => {
                  setActiveSessionId(session.id);
                  setSidebarOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.messages[session.messages.length - 1]?.content ?? ""}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button className="flex-1 gradient-primary" onClick={handleCreateNewChat}>
              New Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportChat}
              title="Export chat"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">DocuAI</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                title="Refresh chat"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <div className="hidden md:flex space-x-2">
                <Link to="/documents">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                </Link>
                <Link to="/workflows">
                  <Button variant="outline" size="sm">
                    <Workflow className="h-4 w-4 mr-2" />
                    Workflows
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Reports
                  </Button>
                </Link>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {activeSession &&
              activeSession.messages.filter((message) => message.sender === "user").length === 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Suggested questions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left h-auto p-3 justify-start hover:bg-accent transition-smooth"
                        onClick={() => handleSendMessage(question)}
                      >
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {question}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

            {messagesToDisplay.map((message) => (
              <div
                key={message.id}
                className={`flex space-x-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender !== "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[70%] rounded-lg p-4 group relative ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.sender === "system"
                      ? "bg-muted text-muted-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.sender !== "system" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-smooth h-6 w-6 p-0"
                        onClick={() => handleCopyMessage(message.content)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-accent text-accent-foreground rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {searchTerm && messagesToDisplay.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No messages found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-4">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={uploadingFile}
                  className="cursor-pointer"
                  asChild
                >
                  <div>
                    <Upload className={`h-4 w-4 ${uploadingFile ? "animate-spin" : ""}`} />
                  </div>
                </Button>
              </label>
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask something like 'Where is the refund policy?'"
                  className="pr-12 transition-smooth focus:ring-2 focus:ring-primary"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="absolute right-1 top-1 bottom-1 gradient-primary hover:shadow-medium transition-smooth"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;