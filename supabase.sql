    -- Create the match_documents function
    create or replace function match_documents(
    query_embedding vector(768),
    match_threshold float,
    match_count int
    )
    returns table (
    id uuid,
    content text,
    similarity float
    )
    language sql
    as $$
    select
        id,
        content,
        1 - (embedding <=> query_embedding) as similarity
    from documents
    where 1 - (embedding <=> query_embedding) > match_threshold
    order by similarity desc
    limit match_count;
    $$;

    -- Ensure your documents table looks like this:
    -- CREATE TABLE documents (
    --   id uuid PRIMARY KEY,
    --   content text,
    --   embedding vector(768)
    -- );
