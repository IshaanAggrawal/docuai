    import type { NextApiRequest, NextApiResponse } from 'next';
    import { createClient } from '@supabase/supabase-js';

    const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
    );

    export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end('Method not allowed');

    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return res.status(401).json({ error: error.message });
        return res.status(200).json({ message: 'Login successful', session: data.session });
    } catch (err: any) {
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    }