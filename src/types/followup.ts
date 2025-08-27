export interface PreSaleFollowUp {
  id: string;
  clientName: string;
  phone: string;
  originalReason: string;
  createdAt: string;
  followUpType: '1H' | '24H' | '48H' | '7DAYS';
  status: 'ok' | 'warning' | 'overdue';
  timeRemaining: string;
}

export interface PostSaleFollowUp {
  id: string;
  clientName: string;
  phone: string;
  productPurchased: string;
  purchaseDate: string;
  followUpType: '24H' | '14DAYS' | '30DAYS';
  completed: boolean;
  status: 'ok' | 'warning' | 'overdue';
}

export const mockPreSaleFollowUps: PreSaleFollowUp[] = [
  {
    id: '1',
    clientName: 'João Silva',
    phone: '(11) 99999-1234',
    originalReason: 'Interesse em iPhone 15',
    createdAt: '2024-01-16 14:30',
    followUpType: '1H',
    status: 'overdue',
    timeRemaining: '30 min atrasado'
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    phone: '(11) 98888-5678',
    originalReason: 'Orçamento Galaxy S24',
    createdAt: '2024-01-16 16:00',
    followUpType: '1H',
    status: 'warning',
    timeRemaining: '15 min restantes'
  },
  {
    id: '3',
    clientName: 'Pedro Costa',
    phone: '(11) 97777-9012',
    originalReason: 'Capinha iPhone 13',
    createdAt: '2024-01-15 10:00',
    followUpType: '24H',
    status: 'ok',
    timeRemaining: '6h restantes'
  },
  {
    id: '4',
    clientName: 'Ana Oliveira',
    phone: '(11) 96666-3456',
    originalReason: 'Fone Bluetooth',
    createdAt: '2024-01-14 15:30',
    followUpType: '48H',
    status: 'warning',
    timeRemaining: '2h restantes'
  },
  {
    id: '5',
    clientName: 'Carlos Ferreira',
    phone: '(11) 95555-7890',
    originalReason: 'Troca de celular',
    createdAt: '2024-01-10 09:00',
    followUpType: '7DAYS',
    status: 'ok',
    timeRemaining: '3 dias restantes'
  }
];

export const mockPostSaleFollowUps: PostSaleFollowUp[] = [
  {
    id: '1',
    clientName: 'Roberto Lima',
    phone: '(11) 94444-2468',
    productPurchased: 'iPhone 15 Pro Max',
    purchaseDate: '2024-01-16 10:30',
    followUpType: '24H',
    completed: false,
    status: 'ok'
  },
  {
    id: '2',
    clientName: 'Fernanda Costa',
    phone: '(11) 93333-1357',
    productPurchased: 'Galaxy S24 Ultra',
    purchaseDate: '2024-01-15 14:15',
    followUpType: '24H',
    completed: false,
    status: 'overdue'
  },
  {
    id: '3',
    clientName: 'Lucas Martins',
    phone: '(11) 92222-8642',
    productPurchased: 'AirPods Pro 2',
    purchaseDate: '2024-01-02 16:45',
    followUpType: '14DAYS',
    completed: true,
    status: 'ok'
  },
  {
    id: '4',
    clientName: 'Patricia Oliveira',
    phone: '(11) 91111-9753',
    productPurchased: 'iPhone 14 Plus',
    purchaseDate: '2023-12-17 11:20',
    followUpType: '30DAYS',
    completed: false,
    status: 'warning'
  }
];