'use client';

import { useState, type ChangeEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { uploadDocumentToDocuAI } from '@/pages/api/query-docuai';

export function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const message = await uploadDocumentToDocuAI(file, category, tags);
      console.log('Upload successful:', message);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="file-upload">Document</Label>
          <Input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={uploading}
            variant="outline"
            type="button"
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="policies">Policies</SelectItem>
              <SelectItem value="procedures">Procedures</SelectItem>
              <SelectItem value="culture">Company Culture</SelectItem>
              <SelectItem value="benefits">Benefits</SelectItem>
              <SelectItem value="training">Training Materials</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., hr, finance, it"
        />
      </div>
    </div>
  );
}