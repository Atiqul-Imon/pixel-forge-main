'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import { trackEvent } from '@/lib/gtag';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  LogOut, 
  FileText, 
  Image as ImageIcon,
  Tag,
  Settings,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';
import ImageKitUpload from '@/components/ImageKitUpload';

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { logout } = useAuth();
  const { loading: authLoading } = useAdminAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BlogPostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Pixel Forge Team',
    category: 'Web Development',
    tags: [],
    image: '',
    featured: false,
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: []
  });

  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const categories = [
    'Web Development',
    'E-commerce',
    'Technology',
    'Digital Marketing',
    'Performance',
    'Tutorials',
    'Case Studies'
  ];

  // Fetch blog post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id || authLoading) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        const response = await fetch(`/api/admin/blog/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog post not found');
            return;
          }
          const errorData = await response.json();
          console.error('API Error:', errorData);
          setError(errorData.error || 'Failed to fetch blog post');
          return;
        }

        const data = await response.json();
        console.log('API Response:', data);
        if (data.success && data.post) {
          setFormData({
            title: data.post.title || '',
            slug: data.post.slug || '',
            excerpt: data.post.excerpt || '',
            content: data.post.content || '',
            author: data.post.author || 'Pixel Forge Team',
            category: data.post.category || 'Web Development',
            tags: data.post.tags || [],
            image: data.post.image || '',
            featured: data.post.featured || false,
            status: data.post.status || 'draft',
            seoTitle: data.post.seoTitle || '',
            seoDescription: data.post.seoDescription || '',
            seoKeywords: data.post.seoKeywords || []
          });
        } else {
          setError('Failed to load blog post data');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, authLoading]);

  // Auto-generate SEO title and description
  useEffect(() => {
    if (formData.title && !formData.seoTitle) {
      setFormData(prev => ({ 
        ...prev, 
        seoTitle: `${formData.title} | Pixel Forge Blog`
      }));
    }
    if (formData.excerpt && !formData.seoDescription) {
      setFormData(prev => ({ 
        ...prev, 
        seoDescription: formData.excerpt.substring(0, 160)
      }));
    }
  }, [formData.title, formData.excerpt]);

  const handleInputChange = (field: keyof BlogPostData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.seoKeywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seoKeywords: [...prev.seoKeywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seoKeywords: prev.seoKeywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // Validate SEO title length
      if (formData.seoTitle && formData.seoTitle.length > 60) {
        setSubmitStatus('error');
        console.error('Error: SEO title cannot exceed 60 characters');
        return;
      }

      // Validate SEO description length
      if (formData.seoDescription && formData.seoDescription.length > 160) {
        setSubmitStatus('error');
        console.error('Error: SEO description cannot exceed 160 characters');
        return;
      }

      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus('success');
        // Track blog post update
        trackEvent.blogPostCreate();
        router.push('/admin/blog');
      } else if (response.status === 401) {
        // Token expired, redirect to login
        router.push('/admin/login');
        return;
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Error:', errorData.error);
        if (errorData.details) {
          console.error('Error details:', errorData.details);
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen pt-16 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog Post</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog Posts
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
                <p className="text-gray-600">Update your blog post content and settings</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/blog"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">Blog post updated successfully!</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">Failed to update blog post. Please try again.</span>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'content'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Content
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'seo'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    SEO
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="post-url-slug"
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of the post"
                      required
                    />
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image *
                    </label>
                    <ImageKitUpload
                      onUpload={(url) => handleInputChange('image', url)}
                      onRemove={() => handleInputChange('image', '')}
                      currentImage={formData.image}
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <RichTextEditor
                      content={formData.content}
                      onChange={(content) => handleInputChange('content', content)}
                      placeholder="Write your post content here..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="SEO optimized title"
                      maxLength={60}
                    />
                    <p className={`text-sm mt-1 ${formData.seoTitle.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formData.seoTitle.length}/60 characters
                      {formData.seoTitle.length > 60 && ' (Too long!)'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="SEO optimized description"
                      maxLength={160}
                    />
                    <p className={`text-sm mt-1 ${formData.seoDescription.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formData.seoDescription.length}/160 characters
                      {formData.seoDescription.length > 160 && ' (Too long!)'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Keywords
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.seoKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add keyword"
                      />
                      <button
                        type="button"
                        onClick={handleAddKeyword}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-gray-600 hover:text-gray-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add tag"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Post</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}