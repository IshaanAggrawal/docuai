import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, Bot, User, MessageSquare, Menu, X, Home, Download, Search, Trash2, Copy, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(() => {
    const cached = localStorage.getItem('docuai-messages');
    return cached ? JSON.parse(cached) : [
      {
        id: '1',
        content: "Hello! I'm DocuAI, your company's AI assistant. I can help you find information from your internal documents, policies, and knowledge base. What would you like to know?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(() => {
    const cached = localStorage.getItem('docuai-chat-history');
    return cached ? JSON.parse(cached) : [
      { id: '1', title: 'Employee handbook questions', lastMessage: 'What is the vacation policy?', timestamp: new Date(Date.now() - 3600000) },
      { id: '2', title: 'IT support procedures', lastMessage: 'How do I reset my password?', timestamp: new Date(Date.now() - 7200000) },
      { id: '3', title: 'Benefits overview', lastMessage: 'Tell me about health insurance', timestamp: new Date(Date.now() - 86400000) },
    ];
  });

  const suggestedQuestions = [
    "What is our company's vacation policy?",
    "How do I submit an expense report?",
    "What are the IT security guidelines?",
    "Where can I find the employee handbook?",
  ];

  // Cache messages whenever they change
  useEffect(() => {
    localStorage.setItem('docuai-messages', JSON.stringify(messages));
  }, [messages]);

  // Cache chat history whenever it changes
  useEffect(() => {
    localStorage.setItem('docuai-chat-history', JSON.stringify(chatHistory));
  }, [chatHistory]);
  
  // Filter messages based on search term
  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response with caching
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${textToSend}". Based on your company's documentation, here's what I found: This is a simulated response. In a real implementation, this would search through your company's knowledge base and provide relevant information with source citations.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Update chat history
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: textToSend.slice(0, 30) + (textToSend.length > 30 ? '...' : ''),
        lastMessage: textToSend,
        timestamp: new Date(),
      };
      setChatHistory(prev => [newChat, ...prev.slice(0, 9)]); // Keep only last 10 chats
    }, 1000);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Message copied",
      description: "Message content copied to clipboard",
    });
  };

  const handleClearHistory = () => {
    setMessages([{
      id: '1',
      content: "Hello! I'm DocuAI, your company's AI assistant. I can help you find information from your internal documents, policies, and knowledge base. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
    }]);
    toast({
      title: "Chat cleared",
      description: "Your chat history has been cleared",
    });
  };

  const handleExportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.sender === 'user' ? 'You' : 'DocuAI'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docuai-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat exported",
      description: "Your chat history has been downloaded",
    });
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-80 bg-accent border-r border-border flex flex-col`}>
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
          
          {/* Search in sidebar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
              className="pl-9 text-sm"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <Card
                key={chat.id}
                className="p-3 cursor-pointer hover:bg-background transition-smooth border-border hover:border-primary/20"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {chat.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button className="flex-1 gradient-primary">
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Suggested questions (only show if no messages from user) */}
            {messages.length === 1 && (
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
            
            {(searchTerm ? filteredMessages : messages).map((message) => (
              <div
                key={message.id}
                className={`flex space-x-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[70%] rounded-lg p-4 group relative ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-smooth h-6 w-6 p-0"
                      onClick={() => handleCopyMessage(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {message.sender === 'user' && (
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
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {searchTerm && (searchTerm ? filteredMessages : messages).length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No messages found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask something like 'Where is the refund policy?'"
                  className="pr-12 transition-smooth focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
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