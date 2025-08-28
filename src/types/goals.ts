export interface Goal {
  id: string;
  company_id: string;
  leads_frios_meta: number;
  leads_quentes_meta: number;
  conversas_meta: number;
  periodo_inicio: Date;
  periodo_fim: Date;
  created_at: Date;
}

export interface CompanySettings {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  logo_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface WhatsAppConfig {
  id: string;
  company_id: string;
  phone_number: string;
  api_key: string;
  status: 'connected' | 'disconnected';
  last_sync: Date;
}

export interface SaleRecord {
  id: string;
  lead_id: string;
  produto: string;
  valor: number;
  vendedor: string;
  data_fechamento: Date;
  observacoes?: string;
  created_at: Date;
}

// Mock data
export const mockGoal: Goal = {
  id: '1',
  company_id: '1',
  leads_frios_meta: 500,
  leads_quentes_meta: 200,
  conversas_meta: 300,
  periodo_inicio: new Date(2024, 7, 1), // Agosto 2024
  periodo_fim: new Date(2024, 7, 31),
  created_at: new Date()
};

export const mockCompanySettings: CompanySettings = {
  id: '1',
  nome: 'SOLUV.IA Store',
  cnpj: '12.345.678/0001-90',
  endereco: 'Rua das Tecnologias, 123 - Centro, São Paulo - SP',
  telefone: '(11) 98765-4321',
  email: 'contato@soluvia.com.br',
  created_at: new Date(),
  updated_at: new Date()
};

export const mockWhatsAppConfig: WhatsAppConfig = {
  id: '1',
  company_id: '1',
  phone_number: '+5511987654321',
  api_key: '',
  status: 'disconnected',
  last_sync: new Date()
};