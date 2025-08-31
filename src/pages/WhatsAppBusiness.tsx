import { useState } from 'react';
import { MessageCircle, Smartphone, Wifi, WifiOff, QrCode, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockWhatsAppConfig, WhatsAppConfig } from '@/types/goals';
import { useToast } from "@/hooks/use-toast";

export default function WhatsAppBusinessPage() {
  const [config, setConfig] = useState<WhatsAppConfig>(mockWhatsAppConfig);
  const [autoReply, setAutoReply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsLoading(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConfig(prev => ({
        ...prev,
        status: 'connected',
        last_sync: new Date()
      }));
      setIsLoading(false);
      toast({
        title: "WhatsApp conectado",
        description: "Sua conta WhatsApp Business foi conectada com sucesso.",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setConfig(prev => ({
      ...prev,
      status: 'disconnected'
    }));
    toast({
      title: "WhatsApp desconectado",
      description: "Sua conta foi desconectada do sistema.",
    });
  };

  const handleInputChange = (field: keyof WhatsAppConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isConnected = config.status === 'connected';

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-whatsapp" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">WhatsApp Business</h1>
              <p className="text-muted-foreground">
                Configure e gerencie sua integração com WhatsApp Business
              </p>
            </div>
          </div>
          <Badge 
            variant={isConnected ? "default" : "secondary"}
            className={isConnected ? "bg-whatsapp text-whatsapp-foreground" : ""}
          >
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3 mr-1" />
                Conectado
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3 mr-1" />
                Desconectado
              </>
            )}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Connection Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Configuração da Conexão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número do WhatsApp Business</Label>
                    <Input
                      id="phone"
                      value={config.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      placeholder="+55 (11) 99999-9999"
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <QrCode className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Escaneie o QR Code</h4>
                        <p className="text-sm text-muted-foreground">
                          Use seu WhatsApp Business para escanear o código
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-48 h-48 bg-white border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center mx-auto">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </div>

                  <Button 
                    onClick={handleConnect} 
                    disabled={isLoading || !config.phone_number}
                    className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground"
                  >
                    {isLoading ? "Conectando..." : "Conectar WhatsApp"}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-whatsapp/10 p-4 rounded-lg border border-whatsapp/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center">
                        <Wifi className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Conectado com sucesso</h4>
                        <p className="text-sm text-muted-foreground">
                          {config.phone_number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Última sincronização: {config.last_sync.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleDisconnect}
                    variant="outline"
                    className="w-full"
                  >
                    Desconectar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações de Automação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-reply">Resposta Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar mensagens automáticas para novos contatos
                  </p>
                </div>
                <Switch
                  id="auto-reply"
                  checked={autoReply}
                  onCheckedChange={setAutoReply}
                  disabled={!isConnected}
                />
              </div>

              {autoReply && (
                <div className="space-y-2">
                  <Label htmlFor="auto-message">Mensagem Automática</Label>
                  <textarea
                    id="auto-message"
                    className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Olá! Obrigado por entrar em contato com a SOLUV.IA. Em breve um de nossos consultores irá atendê-lo."
                    disabled={!isConnected}
                  />
                </div>
              )}

              <div className="pt-4 space-y-3">
                <h4 className="font-medium">Estatísticas de Hoje</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">47</p>
                    <p className="text-xs text-muted-foreground">Mensagens Enviadas</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">23</p>
                    <p className="text-xs text-muted-foreground">Mensagens Recebidas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '10:45', contact: 'João Silva', message: 'Mensagem automática enviada', type: 'sent' },
                { time: '10:32', contact: 'Maria Santos', message: 'Nova conversa iniciada', type: 'received' },
                { time: '09:15', contact: 'Pedro Costa', message: 'Lead convertido via WhatsApp', type: 'conversion' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'sent' ? 'bg-blue-500' :
                    activity.type === 'received' ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.contact}</p>
                    <p className="text-xs text-muted-foreground">{activity.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}