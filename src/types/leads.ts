export interface Lead {
  id: string;
  name: string;
  phone: string;
  lastContact: string;
  contactReason: string;
  source: 'WhatsApp' | 'Balcão' | 'Instagram';
  status: 'cold' | 'talking' | 'hot';
  createdAt: string;
  history: ContactHistory[];
}

export interface ContactHistory {
  id: string;
  date: string;
  type: 'call' | 'message' | 'visit';
  description: string;
  outcome: string;
}

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 99999-1234',
    lastContact: '2024-01-15 14:30',
    contactReason: 'Interesse em iPhone 15',
    source: 'WhatsApp',
    status: 'cold',
    createdAt: '2024-01-10',
    history: [
      {
        id: '1',
        date: '2024-01-15 14:30',
        type: 'message',
        description: 'Cliente perguntou sobre preço do iPhone 15',
        outcome: 'Enviado valores e condições'
      },
      {
        id: '2', 
        date: '2024-01-10 09:15',
        type: 'call',
        description: 'Primeiro contato via WhatsApp',
        outcome: 'Demonstrou interesse'
      }
    ]
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '(11) 98888-5678',
    lastContact: '2024-01-16 10:15',
    contactReason: 'Capinha e película para Samsung S24',
    source: 'Balcão',
    status: 'talking',
    createdAt: '2024-01-16',
    history: [
      {
        id: '3',
        date: '2024-01-16 10:15',
        type: 'visit',
        description: 'Cliente veio na loja ver acessórios',
        outcome: 'Ficou de decidir até amanhã'
      }
    ]
  },
  {
    id: '3',
    name: 'Pedro Costa',
    phone: '(11) 97777-9012',
    lastContact: '2024-01-16 16:45',
    contactReason: 'Troca de iPhone 13 por iPhone 15',
    source: 'Instagram',
    status: 'hot',
    createdAt: '2024-01-14',
    history: [
      {
        id: '4',
        date: '2024-01-16 16:45',
        type: 'call',
        description: 'Negociação da troca',
        outcome: 'Aceitou proposta, vem buscar amanhã'
      },
      {
        id: '5',
        date: '2024-01-15 11:20',
        type: 'message',
        description: 'Enviou fotos do iPhone 13 atual',
        outcome: 'Avaliação realizada'
      }
    ]
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    phone: '(11) 96666-3456',
    lastContact: '2024-01-14 09:30',
    contactReason: 'Orçamento para fone Bluetooth',
    source: 'WhatsApp',
    status: 'cold',
    createdAt: '2024-01-14',
    history: [
      {
        id: '6',
        date: '2024-01-14 09:30',
        type: 'message',
        description: 'Pediu orçamento de fones sem fio',
        outcome: 'Enviado catálogo'
      }
    ]
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    phone: '(11) 95555-7890',
    lastContact: '2024-01-16 13:20',
    contactReason: 'Reparo de tela iPhone 12',
    source: 'Balcão',
    status: 'talking',
    createdAt: '2024-01-16',
    history: [
      {
        id: '7',
        date: '2024-01-16 13:20',
        type: 'visit',
        description: 'Trouxe iPhone com tela quebrada',
        outcome: 'Orçamento aprovado, reparo em andamento'
      }
    ]
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    phone: '(11) 94444-2468',
    lastContact: '2024-01-15 18:00',
    contactReason: 'Interesse em Galaxy Z Flip',
    source: 'Instagram',
    status: 'hot',
    createdAt: '2024-01-13',
    history: [
      {
        id: '8',
        date: '2024-01-15 18:00',
        type: 'call',
        description: 'Negociação final do preço',
        outcome: 'Aceita parcelamento, confirma compra'
      }
    ]
  }
];