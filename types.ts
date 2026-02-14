
export interface Product {
  id: string;
  name: string;
  category: 'Agriculture' | 'Textiles' | 'Industrial' | 'Electronics';
  description: string;
  origin: string;
  image: string;
  specifications: string[];
}

export interface TradeMetric {
  year: number;
  exports: number;
  imports: number;
  communityImpact: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  productId: string;
  quantity: number;
  requirements: string;
}