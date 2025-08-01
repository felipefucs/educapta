"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { X, User, Target, CheckCircle } from "lucide-react"
import { FormField } from "@/components/common/form-field"
import { LoadingButton } from "@/components/common/loading-button"

interface LeadFormProps {
  onClose: () => void
  onSave: (data: any) => void
}

export function LeadForm({ onClose, onSave }: LeadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("contato")
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    telefone: "",
    email: "",
    nomeAluno: "",
    idadeAluno: "",
    turmaInteresse: "",
    origemLead: "",
    observacoes: "",
  })

  const turmaOptions = [
    { value: "bercario", label: "Berçário" },
    { value: "maternal", label: "Maternal" },
    { value: "pre1", label: "Pré I" },
    { value: "pre2", label: "Pré II" },
    { value: "1ano-a", label: "1º Ano A" },
    { value: "2ano-a", label: "2º Ano A" },
    { value: "3ano-a", label: "3º Ano A" },
  ]

  const origemOptions = [
    { value: "google", label: "Google" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "indicacao", label: "Indicação" },
    { value: "site", label: "Site da escola" },
    { value: "outros", label: "Outros" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onSave(formData)
    setIsLoading(false)
    onClose()
  }

  const steps = [
    { id: "contato", label: "Dados de Contato", icon: User },
    { id: "interesse", label: "Interesse", icon: Target },
    { id: "confirmacao", label: "Confirmação", icon: CheckCircle },
  ]

  const canProceed = () => {
    switch (currentStep) {
      case "contato":
        return formData.nomeResponsavel && formData.telefone && formData.email
      case "interesse":
        return formData.turmaInteresse
      case "confirmacao":
        return true
      default:
        return false
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Adicionar Novo Lead
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Cadastre um novo lead interessado na escola</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-6">
        {/* Indicador de Progresso */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = steps.findIndex((s) => s.id === currentStep) > index

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isCompleted
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  <StepIcon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-green-600" : "bg-gray-300"}`} />
                )}
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsContent value="contato" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Dados de Contato</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Nome do Responsável"
                    id="nomeResponsavel"
                    placeholder="Digite o nome completo"
                    value={formData.nomeResponsavel}
                    onChange={(value) => handleInputChange("nomeResponsavel", value)}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Telefone"
                      id="telefone"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(value) => handleInputChange("telefone", value)}
                      required
                    />
                    <FormField
                      label="E-mail"
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Nome do Aluno"
                      id="nomeAluno"
                      placeholder="Nome da criança"
                      value={formData.nomeAluno}
                      onChange={(value) => handleInputChange("nomeAluno", value)}
                    />
                    <FormField
                      label="Idade do Aluno"
                      id="idadeAluno"
                      type="number"
                      placeholder="5"
                      value={formData.idadeAluno}
                      onChange={(value) => handleInputChange("idadeAluno", value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interesse" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Interesse e Origem</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Turma de Interesse"
                    id="turmaInteresse"
                    type="select"
                    placeholder="Selecione a turma"
                    value={formData.turmaInteresse}
                    onChange={(value) => handleInputChange("turmaInteresse", value)}
                    options={turmaOptions}
                    required
                  />
                  <FormField
                    label="Origem do Lead"
                    id="origemLead"
                    type="select"
                    placeholder="Como nos conheceu?"
                    value={formData.origemLead}
                    onChange={(value) => handleInputChange("origemLead", value)}
                    options={origemOptions}
                  />
                  <FormField
                    label="Observações"
                    id="observacoes"
                    type="textarea"
                    placeholder="Informações adicionais sobre o interesse..."
                    value={formData.observacoes}
                    onChange={(value) => handleInputChange("observacoes", value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="confirmacao" className="space-y-6 mt-4">
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Confirmar Lead</h3>
                <p className="text-muted-foreground mb-8">
                  Revise os dados e confirme o cadastro do lead <strong>{formData.nomeResponsavel}</strong>
                </p>

                <div className="bg-slate-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Responsável:</span>
                        <span>{formData.nomeResponsavel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Telefone:</span>
                        <span>{formData.telefone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">E-mail:</span>
                        <span>{formData.email}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Aluno:</span>
                        <span>{formData.nomeAluno || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Turma:</span>
                        <span>{turmaOptions.find((t) => t.value === formData.turmaInteresse)?.label || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Origem:</span>
                        <span>{origemOptions.find((o) => o.value === formData.origemLead)?.label || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <div>
              {currentStep !== "contato" && (
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

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>

              {currentStep === "confirmacao" ? (
                <LoadingButton type="submit" loading={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
                  Cadastrar Lead
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
                  disabled={!canProceed()}
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
