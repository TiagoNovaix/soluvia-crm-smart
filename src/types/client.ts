
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'lead' | 'active' | 'inactive';
  source: 'WhatsApp' | 'Balcão' | 'Instagram' | 'Site' | 'Indicação';
  createdAt: string;
  lastContact: string;
  totalPurchases: number;
  history: ClientHistory[];
  notes?: string;
}

export interface ClientHistory {
  id: string;
  date: string;
  type: 'call' | 'message' | 'visit' | 'purchase' | 'support';
  description: string;
  outcome: string;
  value?: number;
}

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Ana Clara Santos',
    email: 'ana.santos@gmail.com',
    phone: '(11) 99876-5432',
    status: 'active',
    source: 'WhatsApp',
    createdAt: '2024-01-10',
    lastContact: '2024-01-25',
    totalPurchases: 3200.00,
    history: [
      {
        id: '1',
        date: '2024-01-25',
        type: 'purchase',
        description: 'Compra iPhone 15 Pro Max',
        outcome: 'Venda finalizada',
        value: 3200.00
      }
    ]
  },
  {
    id: '2',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@outlook.com',
    phone: '(11) 98765-4321',
    status: 'lead',
    source: 'Instagram',
    createdAt: '2024-01-20',
    lastContact: '2024-01-24',
    totalPurchases: 0,
    history: [
      {
        id: '2',
        date: '2024-01-24',
        type: 'message',
        description: 'Interesse em Galaxy S24',
        outcome: 'Aguardando resposta'
      }
    ]
  },
  {
    id: '3',
    name: 'Mariana Costa Lima',
    email: 'mariana.lima@yahoo.com',
    phone: '(11) 97654-3210',
    status: 'active',
    source: 'Balcão',
    createdAt: '2024-01-15',
    lastContact: '2024-01-23',
    totalPurchases: 1500.00,
    history: [
      {
        id: '3',
        date: '2024-01-23',
        type: 'support',
        description: 'Dúvida sobre garantia AirPods',
        outcome: 'Problema resolvido'
      }
    ]
  },
  {
    id: '4',
    name: 'Roberto Ferreira',
    email: 'roberto.ferreira@empresa.com',
    phone: '(11) 96543-2109',
    status: 'inactive',
    source: 'Site',
    createdAt: '2024-01-05',
    lastContact: '2024-01-18',
    totalPurchases: 450.00,
    history: [
      {
        id: '4',
        date: '2024-01-18',
        type: 'call',
        description: 'Tentativa de reativação',
        outcome: 'Não atendeu'
      }
    ]
  },
  {
    id: '5',
    name: 'Juliana Oliveira',
    email: 'juliana.oliveira@hotmail.com',
    phone: '(11) 95432-1098',
    status: 'active',
    source: 'Indicação',
    createdAt: '2024-01-12',
    lastContact: '2024-01-22',
    totalPurchases: 2800.00,
    history: [
      {
        id: '5',
        date: '2024-01-22',
        type: 'purchase',
        description: 'MacBook Air M2',
        outcome: 'Venda concluída',
        value: 2800.00
      }
    ]
  },
  {
    id: '6',
    name: 'Pedro Henrique Moura',
    email: 'pedro.moura@gmail.com',
    phone: '(11) 94321-0987',
    status: 'lead',
    source: 'WhatsApp',
    createdAt: '2024-01-18',
    lastContact: '2024-01-21',
    totalPurchases: 0,
    history: [
      {
        id: '6',
        date: '2024-01-21',
        type: 'message',
        description: 'Orçamento smartwatch',
        outcome: 'Em negociação'
      }
    ]
  },
  {
    id: '7',
    name: 'Fernanda Almeida',
    email: 'fernanda.almeida@email.com',
    phone: '(11) 93210-9876',
    status: 'active',
    source: 'Balcão',
    createdAt: '2024-01-08',
    lastContact: '2024-01-20',
    totalPurchases: 1200.00,
    history: [
      {
        id: '7',
        date: '2024-01-20',
        type: 'visit',
        description: 'Reparo de tela iPhone',
        outcome: 'Serviço realizado'
      }
    ]
  },
  {
    id: '8',
    name: 'Lucas Rodrigues',
    email: 'lucas.rodrigues@tech.com',
    phone: '(11) 92109-8765',
    status: 'inactive',
    source: 'Instagram',
    createdAt: '2024-01-03',
    lastContact: '2024-01-15',
    totalPurchases: 89.90,
    history: [
      {
        id: '8',
        date: '2024-01-15',
        type: 'message',
        description: 'Não respondeu follow-up',
        outcome: 'Sem retorno'
      }
    ]
  },
  {
    id: '9',
    name: 'Camila Souza',
    email: 'camila.souza@corp.com.br',
    phone: '(11) 91098-7654',
    status: 'active',
    source: 'Site',
    createdAt: '2024-01-14',
    lastContact: '2024-01-19',
    totalPurchases: 5200.00,
    history: [
      {
        id: '9',
        date: '2024-01-19',
        type: 'purchase',
        description: 'iPad Pro + Apple Pencil',
        outcome: 'Venda finalizada',
        value: 5200.00
      }
    ]
  },
  {
    id: '10',
    name: 'Daniel Barbosa',
    email: 'daniel.barbosa@outlook.com',
    phone: '(11) 90987-6543',
    status: 'lead',
    source: 'Indicação',
    createdAt: '2024-01-22',
    lastContact: '2024-01-24',
    totalPurchases: 0,
    history: [
      {
        id: '10',
        date: '2024-01-24',
        type: 'call',
        description: 'Primeiro contato',
        outcome: 'Demonstrou interesse'
      }
    ]
  },
  {
    id: '11',
    name: 'Beatriz Cardoso',
    email: 'beatriz.cardoso@gmail.com',
    phone: '(11) 98876-5431',
    status: 'active',
    source: 'WhatsApp',
    createdAt: '2024-01-11',
    lastContact: '2024-01-18',
    totalPurchases: 950.00,
    history: [
      {
        id: '11',
        date: '2024-01-18',
        type: 'purchase',
        description: 'Capinha + película iPhone',
        outcome: 'Venda concluída',
        value: 950.00
      }
    ]
  },
  {
    id: '12',
    name: 'Thiago Mendes',
    email: 'thiago.mendes@empresa.net',
    phone: '(11) 97765-4320',
    status: 'inactive',
    source: 'Balcão',
    createdAt: '2024-01-07',
    lastContact: '2024-01-16',
    totalPurchases: 320.00,
    history: [
      {
        id: '12',
        date: '2024-01-16',
        type: 'visit',
        description: 'Visitou loja, não comprou',
        outcome: 'Sem interesse no momento'
      }
    ]
  }
];
