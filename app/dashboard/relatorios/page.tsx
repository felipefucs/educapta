"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, BarChart3, TrendingUp, CreditCard, Target } from "lucide-react"

export default function RelatoriosPage() {
  const [periodoInicio, setPeriodoInicio] = useState("")
  const [periodoFim, setPeriodoFim] = useState("")
  const [tipoRelatorio, setTipoRelatorio] = useState("")

  // Dados mockados para relatórios
  const kpis = {
    totalAlunos: 245,
    alunosMatriculados: 198,
    taxaConversao: 78.5,
    receitaTotal: 189500,
    ticketMedio: 856.25,
    inadimplencia: 3.2,
  }

  const dadosConversao = [
    { etapa: "Captação", quantidade: 67, conversao: 100 },
    { etapa: "Pré-matrícula", quantidade: 34, conversao: 50.7 },
    { etapa: "Matriculado", quantidade: 198, conversao: 80.8 },
  ]

  const receitaPorMes = [
    { mes: "Janeiro", receita: 45000, meta: 50000 },
    { mes: "Fevereiro", receita: 52000, meta: 50000 },
    { mes: "Março", receita: 48000, meta: 50000 },
    { mes: "Abril", receita: 44500, meta: 50000 },
  ]

  const ocupacaoTurmas = [
    { turma: "1º Ano A", capacidade: 25, ocupadas: 23, percentual: 92 },
    { turma: "1º Ano B", capacidade: 25, ocupadas: 20, percentual: 80 },
    { turma: "2º Ano A", capacidade: 25, ocupadas: 25, percentual: 100 },
    { turma: "3º Ano A", capacidade: 30, ocupadas: 18, percentual: 60 },
  ]

  const relatoriosDisponiveis = [
    {
      nome: "Relatório de Matrículas",
      descricao: "Lista completa de alunos matriculados com dados pessoais e responsáveis",
      tipo: "matriculas",
      formato: "CSV/Excel",
    },
    {
      nome: "Relatório Financeiro",
      descricao: "Receitas, pagamentos pendentes e inadimplência por período",
      tipo: "financeiro",
      formato: "CSV/Excel/PDF",
    },
    {
      nome: "Relatório de Ocupação",
      descricao: "Ocupação de turmas, vagas disponíveis e lista de espera",
      tipo: "ocupacao",
      formato: "CSV/Excel",
    },
    {
      nome: "Relatório de Comunicações",
      descricao: "Histórico de comunicações enviadas por tipo e status",
      tipo: "comunicacoes",
      formato: "CSV/Excel",
    },
    {
      nome: "Relatório de Contratos",
      descricao: "Status de contratos, assinaturas pendentes e documentos",
      tipo: "contratos",
      formato: "CSV/Excel/PDF",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Relatórios e Análises</h2>
        <p className="text-muted-foreground">Dashboard analítico e exportação de relatórios</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpis.taxaConversao}%</div>
                <p className="text-xs text-muted-foreground">+2.1% em relação ao mês anterior</p>
                <Progress value={kpis.taxaConversao} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {kpis.receitaTotal.toLocaleString("pt-BR")}</div>
                <p className="text-xs text-muted-foreground">
                  Ticket médio: R$ {kpis.ticketMedio.toLocaleString("pt-BR")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpis.inadimplencia}%</div>
                <p className="text-xs text-muted-foreground">-0.5% em relação ao mês anterior</p>
                <Progress value={kpis.inadimplencia} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Funil de Conversão */}
            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
                <CardDescription>Taxa de conversão por etapa do processo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dadosConversao.map((etapa, index) => (
                  <div key={etapa.etapa} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{etapa.etapa}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{etapa.quantidade} alunos</div>
                        <div className="text-xs text-muted-foreground">{etapa.conversao}%</div>
                      </div>
                    </div>
                    <Progress value={etapa.conversao} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ocupação de Turmas */}
            <Card>
              <CardHeader>
                <CardTitle>Ocupação de Turmas</CardTitle>
                <CardDescription>Percentual de ocupação por turma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ocupacaoTurmas.map((turma) => (
                  <div key={turma.turma} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{turma.turma}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {turma.ocupadas}/{turma.capacidade}
                        </div>
                        <div className="text-xs text-muted-foreground">{turma.percentual}%</div>
                      </div>
                    </div>
                    <Progress value={turma.percentual} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Receita por Mês */}
          <Card>
            <CardHeader>
              <CardTitle>Receita vs Meta</CardTitle>
              <CardDescription>Comparativo de receita realizada vs meta mensal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {receitaPorMes.map((mes) => (
                  <div key={mes.mes} className="space-y-2">
                    <div className="text-sm font-medium">{mes.mes}</div>
                    <div className="text-2xl font-bold">R$ {(mes.receita / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-muted-foreground">Meta: R$ {(mes.meta / 1000).toFixed(0)}k</div>
                    <Progress value={(mes.receita / mes.meta) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          {/* Filtros para Relatórios */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Relatório</CardTitle>
              <CardDescription>Configure o período e tipo de relatório para exportação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="grid gap-2">
                  <Label htmlFor="inicio">Data Início</Label>
                  <Input
                    id="inicio"
                    type="date"
                    value={periodoInicio}
                    onChange={(e) => setPeriodoInicio(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fim">Data Fim</Label>
                  <Input id="fim" type="date" value={periodoFim} onChange={(e) => setPeriodoFim(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo de Relatório</Label>
                  <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matriculas">Matrículas</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="ocupacao">Ocupação</SelectItem>
                      <SelectItem value="comunicacoes">Comunicações</SelectItem>
                      <SelectItem value="contratos">Contratos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Relatórios Disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>Selecione e exporte os relatórios necessários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {relatoriosDisponiveis.map((relatorio) => (
                  <Card key={relatorio.tipo} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription>{relatorio.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Formato: {relatorio.formato}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            CSV
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Excel
                          </Button>
                          {relatorio.formato.includes("PDF") && (
                            <Button size="sm" variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              PDF
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Relatórios Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>Últimos relatórios gerados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Relatório de Matrículas - Janeiro 2024</div>
                      <div className="text-sm text-muted-foreground">Gerado em 20/01/2024 às 14:30</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Relatório Financeiro - Janeiro 2024</div>
                      <div className="text-sm text-muted-foreground">Gerado em 19/01/2024 às 09:15</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Relatório de Ocupação - Janeiro 2024</div>
                      <div className="text-sm text-muted-foreground">Gerado em 18/01/2024 às 16:45</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
