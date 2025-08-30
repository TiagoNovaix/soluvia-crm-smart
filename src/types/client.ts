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
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-1234',
    status: 'active',
    source: 'WhatsApp',
    createdAt: '2024-01-10',
    lastContact: '2024-01-15 14:30',
    totalPurchases: 2850.00,
    history: [
      {
        id: '1',
        date: '2024-01-15 14:30',
        type: 'purchase',
        description: 'Compra iPhone 15 Pro',
        outcome: 'Venda finalizada',
        value: 2850.00
      },
      {
        id: '2',
        date: '2024-01-10 09:15',
        type: 'call',
        description: 'Primeiro contato para orçamento',
        outcome: 'Demonstrou interesse'
      }
    ]
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@gmail.com',
    phone: '(11) 98888-5678',
    status: 'lead',
    source: 'Instagram',
    createdAt: '2024-01-16',
    lastContact: '2024-01-16 10:15',
    totalPurchases: 0,
    history: [
      {
        id: '3',
        date: '2024-01-16 10:15',
        type: 'message',
        description: 'Interesse em capinha Samsung S24',
        outcome: 'Enviado catálogo'
      }
    ]
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@outlook.com',
    phone: '(11) 97777-9012',
    status: 'active',
    source: 'Balcão',
    createdAt: '2024-01-14',
    lastContact: '2024-01-16 16:45',
    totalPurchases: 1200.00,
    history: [
      {
        id: '4',
        date: '2024-01-16 16:45',
        type: 'support',
        description: 'Dúvida sobre garantia',
        outcome: 'Esclarecido, cliente satisfeito'
      },
      {
        id: '5',
        date: '2024-01-14 11:20',
        type: 'purchase',
        description: 'Compra AirPods Pro',
        outcome: 'Venda finalizada',
        value: 1200.00
      }
    ]
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@yahoo.com',
    phone: '(11) 96666-3456',
    status: 'inactive',
    source: 'Site',
    createdAt: '2024-01-10',
    lastContact: '2024-01-14 09:30',
    totalPurchases: 450.00,
    history: [
      {
        id: '6',
        date: '2024-01-14 09:30',
        type: 'message',
        description: 'Pergunta sobre frete',
        outcome: 'Informações enviadas'
      },
      {
        id: '7',
        date: '2024-01-10 15:00',
        type: 'purchase',
        description: 'Compra cabo USB-C',
        outcome: 'Venda finalizada',
        value: 450.00
      }
    ]
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@empresa.com',
    phone: '(11) 95555-7890',
    status: 'active',
    source: 'Indicação',
    createdAt: '2024-01-12',
    lastContact: '2024-01-16 13:20',
    totalPurchases: 3200.00,
    history: [
      {
        id: '8',
        date: '2024-01-16 13:20',
        type: 'visit',
        description: 'Visita para reparo de iPhone',
        outcome: 'Reparo em andamento'
      },
      {
        id: '9',
        date: '2024-01-12 10:30',
        type: 'purchase',
        description: 'Compra Galaxy S24 Ultra',
        outcome: 'Venda finalizada',
        value: 3200.00
      }
    ]
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@hotmail.com',
    phone: '(11) 94444-2468',
    status: 'lead',
    source: 'WhatsApp',
    createdAt: '2024-01-13',
    lastContact: '2024-01-15 18:00',
    totalPurchases: 0,
    history: [
      {
        id: '10',
        date: '2024-01-15 18:00',
        type: 'call',
        description: 'Orçamento Galaxy Z Flip',
        outcome: 'Em negociação'
      }
    ]
  },
  {
    id: '7',
    name: 'Roberto Mendes',
    email: 'roberto.mendes@gmail.com',
    phone: '(11) 93333-1111',
    status: 'active',
    source: 'Balcão',
    createdAt: '2024-01-08',
    lastContact: '2024-01-15 12:00',
    totalPurchases: 1750.00,
    history: [
      {
        id: '11',
        date: '2024-01-15 12:00',
        type: 'purchase',
        description: 'Compra smartwatch Apple',
        outcome: 'Venda finalizada',
        value: 1750.00
      }
    ]
  },
  {
    id: '8',
    name: 'Luciana Torres',
    email: 'luciana.torres@email.com',
    phone: '(11) 92222-5555',
    status: 'inactive',
    source: 'Instagram',
    createdAt: '2024-01-05',
    lastContact: '2024-01-12 16:30',
    totalPurchases: 89.90,
    history: [
      {
        id: '12',
        date: '2024-01-12 16:30',
        type: 'message',
        description: 'Dúvida sobre produto',
        outcome: 'Não respondeu mais'
      }
    ]
  },
  {
    id: '9',
    name: 'Eduardo Santos',
    email: 'eduardo.santos@empresa.com.br',
    phone: '(11) 91111-9999',
    status: 'active',
    source: 'Site',
    createdAt: '2024-01-09',
    lastContact: '2024-01-16 11:45',
    totalPurchases: 4500.00,
    history: [
      {
        id: '13',
        date: '2024-01-16 11:45',
        type: 'purchase',
        description: 'Compra MacBook Air',
        outcome: 'Venda finalizada',
        value: 4500.00
      }
    ]
  },
  {
    id: '10',
    name: 'Patricia Alves',
    email: 'patricia.alves@outlook.com',
    phone: '(11) 90000-7777',
    status: 'lead',
    source: 'Indicação',
    createdAt: '2024-01-16',
    lastContact: '2024-01-16 09:00',
    totalPurchases: 0,
    history: [
      {
        id: '14',
        date: '2024-01-16 09:00',
        type: 'call',
        description: 'Primeiro contato via indicação',
        outcome: 'Agendada visita'
      }
    ]
  },
  {
    id: '11',
    name: 'Marcos Silva',
    email: 'marcos.silva@gmail.com',
    phone: '(11) 98765-4321',
    status: 'active',
    source: 'WhatsApp',
    createdAt: '2024-01-11',
    lastContact: '2024-01-15 15:20',
    totalPurchases: 850.00,
    history: [
      {
        id: '15',
        date: '2024-01-15 15:20',
        type: 'purchase',
        description: 'Compra case iPhone',
        outcome: 'Venda finalizada',
        value: 850.00
      }
    ]
  },
  {
    id: '12',
    name: 'Silvia Rodriguez',
    email: 'silvia.rodriguez@email.com',
    phone: '(11) 97654-3210',
    status: 'inactive',
    source: 'Balcão',
    createdAt: '2024-01-07',
    lastContact: '2024-01-10 14:00',
    totalPurchases: 120.00,
    history: [
      {
        id: '16',
        date: '2024-01-10 14:00',
        type: 'visit',
        description: 'Visitou loja, não comprou',
        outcome: 'Sem interesse no momento'
      }
    ]
  }
];