"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { X, User, FileText, CreditCard, CheckCircle } from "lucide-react"
import { FormField } from "@/components/common/form-field"
import { LoadingButton } from "@/components/common/loading-button"

interface MatriculaFormProps {
  lead: any
  onClose: () => void
  onSave: (data: any) => void
}

export function MatriculaForm({ lead, onClose, onSave }: MatriculaFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("dados")
  const [formData, setFormData] = useState({
    // Dados do Lead (pré-preenchidos)
    nomeResponsavel: lead.nome || "",
    telefoneResponsavel: lead.telefone || "",
    emailResponsavel: lead.email || "",
    turmaInteresse: lead.turmaInteresse || "",

    // Dados do Aluno
    nomeAluno: lead.nomeAluno || "",
    dataNascimento: "",
    cpfAluno: "",
    enderecoAluno: "",
    necessidadesEspeciais: "",
    medicamentos: "",
    alergias: "",
    contatoEmergencia: "",

    // Dados do Responsável (complementares)
    cpfResponsavel: "",
    rgResponsavel: "",
    enderecoResponsavel: "",
    profissaoResponsavel: "",
    parentesco: "",

    // Dados da Matrícula
    turmaEscolhida: lead.turmaInteresse || "",
    valorMatricula: "850.00",
    valorMensalidade: "750.00",
    dataVencimento: "",
    formaPagamento: "",
    observacoes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simula processo de matrícula
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSave({
      ...formData,
      leadId: lead.id,
      status: "matriculado",
      dataMatricula: new Date().toISOString(),
    })
    setIsLoading(false)
    onClose()
  }

  const turmaOptions = [
    { value: "1ano-a", label: "1º Ano A - Matutino" },
    { value: "2ano-a", label: "2º Ano A - Matutino" },
    { value: "3ano-a", label: "3º Ano A - Vespertino" },
  ]

  const parentescoOptions = [
    { value: "pai", label: "Pai" },
    { value: "mae", label: "Mãe" },
    { value: "responsavel", label: "Responsável Legal" },
  ]

  const formaPagamentoOptions = [
    { value: "boleto", label: "Boleto Bancário" },
    { value: "pix", label: "PIX" },
    { value: "cartao", label: "Cartão de Crédito" },
    { value: "dinheiro", label: "Dinheiro" },
  ]

  const steps = [
    { id: "dados", label: "Dados", icon: User },
    { id: "documentos", label: "Documentos", icon: FileText },
    { id: "pagamento", label: "Pagamento", icon: CreditCard },
    { id: "confirmacao", label: "Confirmação", icon: CheckCircle },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Processo de Matrícula
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Convertendo lead: <strong>{lead.nome}</strong>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-6">
        {/* Indicador de Progresso */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = steps.findIndex((s) => s.id === currentStep) > index

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isCompleted
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <StepIcon className="h-4 w-4" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${isCompleted ? "bg-green-600" : "bg-gray-300"}`} />
                )}
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsContent value="dados" className="space-y-4 mt-4">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Dados do Aluno</h3>
                  <div className="grid gap-4">
                    <FormField
                      label="Nome Completo do Aluno"
                      id="nomeAluno"
                      placeholder="Digite o nome completo do aluno"
                      value={formData.nomeAluno}
                      onChange={(value) => handleInputChange("nomeAluno", value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Data de Nascimento"
                        id="dataNascimento"
                        type="date"
                        value={formData.dataNascimento}
                        onChange={(value) => handleInputChange("dataNascimento", value)}
                        required
                      />
                      <FormField
                        label="CPF do Aluno"
                        id="cpfAluno"
                        placeholder="000.000.000-00"
                        value={formData.cpfAluno}
                        onChange={(value) => handleInputChange("cpfAluno", value)}
                      />
                    </div>
                    <FormField
                      label="Endereço"
                      id="enderecoAluno"
                      type="textarea"
                      placeholder="Endereço completo do aluno"
                      value={formData.enderecoAluno}
                      onChange={(value) => handleInputChange("enderecoAluno", value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Dados do Responsável</h3>
                  <div className="grid gap-4">
                    <FormField
                      label="Nome do Responsável"
                      id="nomeResponsavel"
                      placeholder="Nome completo do responsável"
                      value={formData.nomeResponsavel}
                      onChange={(value) => handleInputChange("nomeResponsavel", value)}
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        label="CPF"
                        id="cpfResponsavel"
                        placeholder="000.000.000-00"
                        value={formData.cpfResponsavel}
                        onChange={(value) => handleInputChange("cpfResponsavel", value)}
                        required
                      />
                      <FormField
                        label="RG"
                        id="rgResponsavel"
                        placeholder="00.000.000-0"
                        value={formData.rgResponsavel}
                        onChange={(value) => handleInputChange("rgResponsavel", value)}
                      />
                      <FormField
                        label="Parentesco"
                        id="parentesco"
                        type="select"
                        placeholder="Selecione"
                        value={formData.parentesco}
                        onChange={(value) => handleInputChange("parentesco", value)}
                        options={parentescoOptions}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Telefone"
                        id="telefoneResponsavel"
                        placeholder="(11) 99999-9999"
                        value={formData.telefoneResponsavel}
                        onChange={(value) => handleInputChange("telefoneResponsavel", value)}
                        required
                      />
                      <FormField
                        label="E-mail"
                        id="emailResponsavel"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={formData.emailResponsavel}
                        onChange={(value) => handleInputChange("emailResponsavel", value)}
                        required
                      />
                    </div>
                    <FormField
                      label="Profissão"
                      id="profissaoResponsavel"
                      placeholder="Profissão do responsável"
                      value={formData.profissaoResponsavel}
                      onChange={(value) => handleInputChange("profissaoResponsavel", value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-4 mt-4">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informações Médicas</h3>
                  <div className="grid gap-4">
                    <FormField
                      label="Necessidades Especiais"
                      id="necessidadesEspeciais"
                      type="textarea"
                      placeholder="Descreva necessidades especiais, se houver"
                      value={formData.necessidadesEspeciais}
                      onChange={(value) => handleInputChange("necessidadesEspeciais", value)}
                    />
                    <FormField
                      label="Medicamentos em Uso"
                      id="medicamentos"
                      type="textarea"
                      placeholder="Liste medicamentos que o aluno toma regularmente"
                      value={formData.medicamentos}
                      onChange={(value) => handleInputChange("medicamentos", value)}
                    />
                    <FormField
                      label="Alergias"
                      id="alergias"
                      type="textarea"
                      placeholder="Liste alergias conhecidas"
                      value={formData.alergias}
                      onChange={(value) => handleInputChange("alergias", value)}
                    />
                    <FormField
                      label="Contato de Emergência"
                      id="contatoEmergencia"
                      placeholder="Nome e telefone para emergências"
                      value={formData.contatoEmergencia}
                      onChange={(value) => handleInputChange("contatoEmergencia", value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Turma</h3>
                  <FormField
                    label="Turma Escolhida"
                    id="turmaEscolhida"
                    type="select"
                    placeholder="Selecione a turma"
                    value={formData.turmaEscolhida}
                    onChange={(value) => handleInputChange("turmaEscolhida", value)}
                    options={turmaOptions}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pagamento" className="space-y-4 mt-4">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Valores</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Valor da Matrícula"
                      id="valorMatricula"
                      placeholder="R$ 850,00"
                      value={formData.valorMatricula}
                      onChange={(value) => handleInputChange("valorMatricula", value)}
                      required
                    />
                    <FormField
                      label="Valor da Mensalidade"
                      id="valorMensalidade"
                      placeholder="R$ 750,00"
                      value={formData.valorMensalidade}
                      onChange={(value) => handleInputChange("valorMensalidade", value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Forma de Pagamento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Forma de Pagamento"
                      id="formaPagamento"
                      type="select"
                      placeholder="Selecione a forma"
                      value={formData.formaPagamento}
                      onChange={(value) => handleInputChange("formaPagamento", value)}
                      options={formaPagamentoOptions}
                      required
                    />
                    <FormField
                      label="Data de Vencimento"
                      id="dataVencimento"
                      type="date"
                      value={formData.dataVencimento}
                      onChange={(value) => handleInputChange("dataVencimento", value)}
                      required
                    />
                  </div>
                </div>

                <FormField
                  label="Observações"
                  id="observacoes"
                  type="textarea"
                  placeholder="Observações adicionais sobre a matrícula"
                  value={formData.observacoes}
                  onChange={(value) => handleInputChange("observacoes", value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="confirmacao" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Confirmar Matrícula</h3>
                <p className="text-muted-foreground mb-6">
                  Revise os dados e confirme a matrícula de <strong>{formData.nomeAluno}</strong>
                </p>

                <div className="bg-slate-50 rounded-lg p-4 text-left max-w-md mx-auto">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Aluno:</span>
                      <span className="font-medium">{formData.nomeAluno}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsável:</span>
                      <span className="font-medium">{formData.nomeResponsavel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Turma:</span>
                      <span className="font-medium">{formData.turmaEscolhida}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matrícula:</span>
                      <span className="font-medium">R$ {formData.valorMatricula}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mensalidade:</span>
                      <span className="font-medium">R$ {formData.valorMensalidade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6 pt-4 border-t">
            <div>
              {currentStep !== "dados" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentIndex = steps.findIndex((s) => s.id === currentStep)
                    if (currentIndex > 0) {
                      setCurrentStep(steps[currentIndex - 1].id)
                    }
                  }}
                >
                  Voltar
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>

              {currentStep === "confirmacao" ? (
                <LoadingButton type="submit" loading={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
                  Confirmar Matrícula
                </LoadingButton>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    const currentIndex = steps.findIndex((s) => s.id === currentStep)
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id)
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Próximo
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
