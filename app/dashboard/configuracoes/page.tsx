"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  Upload,
  Key,
  Mail,
  MessageSquare,
  CreditCard,
  FileText,
  Users,
  School,
  Settings,
  Shield,
  Bell,
} from "lucide-react"

export default function ConfiguracoesPage() {
  const [escolaNome, setEscolaNome] = useState("Colégio Exemplo")
  const [escolaCnpj, setEscolaCnpj] = useState("12.345.678/0001-90")
  const [escolaEndereco, setEscolaEndereco] = useState("Rua das Flores, 123 - São Paulo/SP")
  const [escolaTelefone, setEscolaTelefone] = useState("(11) 3456-7890")
  const [escolaEmail, setEscolaEmail] = useState("contato@colegioexemplo.com.br")

  const [notificacoesEmail, setNotificacoesEmail] = useState(true)
  const [notificacoesWhatsApp, setNotificacoesWhatsApp] = useState(true)
  const [notificacoesPagamento, setNotificacoesPagamento] = useState(true)

  const integracoes = [
    {
      nome: "SendGrid",
      tipo: "E-mail",
      status: "conectado",
      descricao: "Envio de e-mails transacionais",
      icon: Mail,
    },
    {
      nome: "Twilio",
      tipo: "WhatsApp/SMS",
      status: "desconectado",
      descricao: "Envio de mensagens WhatsApp e SMS",
      icon: MessageSquare,
    },
    {
      nome: "PagSeguro",
      tipo: "Pagamentos",
      status: "conectado",
      descricao: "Gateway de pagamentos",
      icon: CreditCard,
    },
    {
      nome: "Clicksign",
      tipo: "Assinatura Digital",
      status: "desconectado",
      descricao: "Assinatura eletrônica de contratos",
      icon: FileText,
    },
  ]

  const usuarios = [
    {
      id: "1",
      nome: "Maria Silva",
      email: "maria@colegioexemplo.com.br",
      tipo: "direcao",
      ativo: true,
      ultimoAcesso: "2024-01-20T10:30:00",
    },
    {
      id: "2",
      nome: "João Santos",
      email: "joao@colegioexemplo.com.br",
      tipo: "secretaria",
      ativo: true,
      ultimoAcesso: "2024-01-20T14:15:00",
    },
    {
      id: "3",
      nome: "Ana Costa",
      email: "ana@colegioexemplo.com.br",
      tipo: "secretaria",
      ativo: false,
      ultimoAcesso: "2024-01-15T09:20:00",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as configurações da escola e integrações</p>
      </div>

      <Tabs defaultValue="escola" className="space-y-6">
        <TabsList>
          <TabsTrigger value="escola">Escola</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="escola" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Dados da Escola
              </CardTitle>
              <CardDescription>Informações básicas da instituição de ensino</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome da Escola</Label>
                  <Input id="nome" value={escolaNome} onChange={(e) => setEscolaNome(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" value={escolaCnpj} onChange={(e) => setEscolaCnpj(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea id="endereco" value={escolaEndereco} onChange={(e) => setEscolaEndereco(e.target.value)} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" value={escolaTelefone} onChange={(e) => setEscolaTelefone(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" value={escolaEmail} onChange={(e) => setEscolaEmail(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo da Escola</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <School className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Fazer Upload
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Usuários do Sistema
                  </CardTitle>
                  <CardDescription>Gerencie usuários e permissões de acesso</CardDescription>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usuarios.map((usuario) => (
                  <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{usuario.nome}</div>
                        <div className="text-sm text-muted-foreground">{usuario.email}</div>
                        <div className="text-xs text-muted-foreground">
                          Último acesso: {new Date(usuario.ultimoAcesso).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={usuario.tipo === "direcao" ? "default" : "secondary"}>
                        {usuario.tipo === "direcao" ? "Direção" : "Secretaria"}
                      </Badge>
                      <Switch checked={usuario.ativo} />
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integracoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Integrações Externas
              </CardTitle>
              <CardDescription>Configure integrações com serviços externos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {integracoes.map((integracao) => {
                  const IconComponent = integracao.icon
                  return (
                    <Card key={integracao.nome} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5" />
                            <div>
                              <CardTitle className="text-lg">{integracao.nome}</CardTitle>
                              <CardDescription>{integracao.tipo}</CardDescription>
                            </div>
                          </div>
                          <Badge variant={integracao.status === "conectado" ? "default" : "secondary"}>
                            {integracao.status === "conectado" ? "Conectado" : "Desconectado"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">{integracao.descricao}</p>
                        <div className="flex gap-2">
                          {integracao.status === "conectado" ? (
                            <>
                              <Button size="sm" variant="outline">
                                <Settings className="mr-2 h-4 w-4" />
                                Configurar
                              </Button>
                              <Button size="sm" variant="destructive">
                                Desconectar
                              </Button>
                            </>
                          ) : (
                            <Button size="sm">
                              <Key className="mr-2 h-4 w-4" />
                              Conectar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>Configure quando e como enviar notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificações por E-mail</Label>
                    <div className="text-sm text-muted-foreground">Enviar notificações importantes por e-mail</div>
                  </div>
                  <Switch checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificações por WhatsApp</Label>
                    <div className="text-sm text-muted-foreground">Enviar lembretes e avisos via WhatsApp</div>
                  </div>
                  <Switch checked={notificacoesWhatsApp} onCheckedChange={setNotificacoesWhatsApp} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificações de Pagamento</Label>
                    <div className="text-sm text-muted-foreground">
                      Alertas automáticos sobre vencimentos e pagamentos
                    </div>
                  </div>
                  <Switch checked={notificacoesPagamento} onCheckedChange={setNotificacoesPagamento} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Configurações Avançadas</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="diasLembrete">Dias antes do vencimento</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 dia</SelectItem>
                        <SelectItem value="3">3 dias</SelectItem>
                        <SelectItem value="5">5 dias</SelectItem>
                        <SelectItem value="7">7 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="horarioEnvio">Horário de envio</Label>
                    <Select defaultValue="09:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00</SelectItem>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Gerencie configurações de segurança e backup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="senhaMinima">Tamanho mínimo da senha</Label>
                    <Select defaultValue="8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 caracteres</SelectItem>
                        <SelectItem value="8">8 caracteres</SelectItem>
                        <SelectItem value="10">10 caracteres</SelectItem>
                        <SelectItem value="12">12 caracteres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sessaoExpira">Expiração da sessão</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hora</SelectItem>
                        <SelectItem value="8">8 horas</SelectItem>
                        <SelectItem value="24">24 horas</SelectItem>
                        <SelectItem value="168">7 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Backup de Dados</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Backup Automático</div>
                      <div className="text-sm text-muted-foreground">Último backup: 20/01/2024 às 03:00</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Fazer Backup Agora
                      </Button>
                      <Button size="sm" variant="outline">
                        Restaurar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Log de Atividades</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="text-sm">
                        <span className="font-medium">Maria Silva</span> acessou o sistema
                      </div>
                      <div className="text-xs text-muted-foreground">20/01/2024 10:30</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="text-sm">
                        <span className="font-medium">João Santos</span> criou novo aluno
                      </div>
                      <div className="text-xs text-muted-foreground">20/01/2024 09:15</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="text-sm">
                        <span className="font-medium">Sistema</span> executou backup automático
                      </div>
                      <div className="text-xs text-muted-foreground">20/01/2024 03:00</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
