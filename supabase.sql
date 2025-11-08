    CREATE OR REPLACE FUNCTION match_documents (
        query_embedding vector(768),
        match_threshold float,
        match_count int
    )
    RETURNS TABLE (
        id uuid,
        content text,
        metadata jsonb,
        similarity float
    )
    LANGUAGE sql
    AS $$
    SELECT
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) AS similarity
    FROM documents
    WHERE 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
    $$;
