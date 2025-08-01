import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Target, TrendingUp, DollarSign } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do sistema Educapta</p>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">+8 novos esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231</div>
            <p className="text-xs text-muted-foreground">+20% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Funil de Matrículas */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Funil de Matrículas</CardTitle>
            <CardDescription>Acompanhe o progresso dos leads até a matrícula</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Captação</span>
                <span className="text-sm text-muted-foreground">67 leads</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pré-matrícula</span>
                <span className="text-sm text-muted-foreground">34 leads</span>
              </div>
              <Progress value={51} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Matriculados</span>
                <span className="text-sm text-muted-foreground">25 alunos</span>
              </div>
              <Progress value={37} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Nova matrícula</p>
                  <p className="text-xs text-muted-foreground">João Silva - 1º Ano A</p>
                </div>
                <div className="text-xs text-muted-foreground">2h</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Novo lead</p>
                  <p className="text-xs text-muted-foreground">Maria Santos - Interessada no 2º Ano</p>
                </div>
                <div className="text-xs text-muted-foreground">4h</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Pagamento pendente</p>
                  <p className="text-xs text-muted-foreground">Ana Costa - Mensalidade Janeiro</p>
                </div>
                <div className="text-xs text-muted-foreground">6h</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Contrato assinado</p>
                  <p className="text-xs text-muted-foreground">Pedro Oliveira - 3º Ano B</p>
                </div>
                <div className="text-xs text-muted-foreground">1d</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status das Turmas */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Turmas</CardTitle>
          <CardDescription>Ocupação atual das turmas por período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Matutino</span>
                <Badge variant="outline">4 turmas</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Ocupação</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Vespertino</span>
                <Badge variant="outline">3 turmas</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Ocupação</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Integral</span>
                <Badge variant="outline">2 turmas</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Ocupação</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
