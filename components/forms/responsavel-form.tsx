"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { X, User, Link, CheckCircle } from "lucide-react"
import { FormField } from "@/components/common/form-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Label } from "@/components/ui/label"

interface ResponsavelFormProps {
  onClose: () => void
  onSave: (data: any) => void
}

export function ResponsavelForm({ onClose, onSave }: ResponsavelFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("pessoais")
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    telefone: "",
    email: "",
    endereco: "",
    profissao: "",
    tipo: "",
    alunosVinculados: [] as string[],
    observacoes: "",
  })

  const alunosDisponiveis = [
    { id: "joao", nome: "João Silva Santos" },
    { id: "ana", nome: "Ana Carolina Oliveira" },
    { id: "pedro", nome: "Pedro Henrique Costa" },
  ]

  const tipoOptions = [
    { value: "pai", label: "Pai" },
    { value: "mae", label: "Mãe" },
    { value: "responsavel_legal", label: "Responsável Legal" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAlunoToggle = (alunoId: string) => {
    setFormData((prev) => ({
      ...prev,
      alunosVinculados: prev.alunosVinculados.includes(alunoId)
        ? prev.alunosVinculados.filter((id) => id !== alunoId)
        : [...prev.alunosVinculados, alunoId],
    }))
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
    { id: "pessoais", label: "Dados Pessoais", icon: User },
    { id: "vinculos", label: "Vínculos", icon: Link },
    { id: "confirmacao", label: "Confirmação", icon: CheckCircle },
  ]

  const canProceed = () => {
    switch (currentStep) {
      case "pessoais":
        return formData.nome && formData.telefone && formData.email
      case "vinculos":
        return formData.tipo && formData.alunosVinculados.length > 0
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
            <User className="h-5 w-5" />
            Cadastrar Novo Responsável
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Preencha os dados do responsável em etapas</p>
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
            <TabsContent value="pessoais" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Dados Pessoais</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Nome Completo"
                    id="nome"
                    placeholder="Digite o nome completo"
                    value={formData.nome}
                    onChange={(value) => handleInputChange("nome", value)}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="CPF"
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(value) => handleInputChange("cpf", value)}
                    />
                    <FormField
                      label="RG"
                      id="rg"
                      placeholder="00.000.000-0"
                      value={formData.rg}
                      onChange={(value) => handleInputChange("rg", value)}
                    />
                  </div>
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
                  <FormField
                    label="Endereço"
                    id="endereco"
                    type="textarea"
                    placeholder="Endereço completo"
                    value={formData.endereco}
                    onChange={(value) => handleInputChange("endereco", value)}
                  />
                  <FormField
                    label="Profissão"
                    id="profissao"
                    placeholder="Profissão"
                    value={formData.profissao}
                    onChange={(value) => handleInputChange("profissao", value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vinculos" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Vínculos e Responsabilidades</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Tipo de Responsabilidade"
                    id="tipo"
                    type="select"
                    placeholder="Selecione o tipo"
                    value={formData.tipo}
                    onChange={(value) => handleInputChange("tipo", value)}
                    options={tipoOptions}
                    required
                  />
                  <div className="grid gap-4">
                    <Label>Alunos Vinculados</Label>
                    <div className="space-y-3">
                      {alunosDisponiveis.map((aluno) => (
                        <div key={aluno.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={aluno.id}
                            checked={formData.alunosVinculados.includes(aluno.id)}
                            onCheckedChange={() => handleAlunoToggle(aluno.id)}
                          />
                          <Label htmlFor={aluno.id} className="flex-1 cursor-pointer">
                            {aluno.nome}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormField
                    label="Observações"
                    id="observacoes"
                    type="textarea"
                    placeholder="Informações adicionais..."
                    value={formData.observacoes}
                    onChange={(value) => handleInputChange("observacoes", value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="confirmacao" className="space-y-6 mt-4">
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Confirmar Cadastro</h3>
                <p className="text-muted-foreground mb-8">
                  Revise os dados e confirme o cadastro do responsável <strong>{formData.nome}</strong>
                </p>

                <div className="bg-slate-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Nome:</span>
                        <span>{formData.nome}</span>
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
                        <span className="font-medium">Tipo:</span>
                        <span>{tipoOptions.find((t) => t.value === formData.tipo)?.label || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Profissão:</span>
                        <span>{formData.profissao || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Alunos:</span>
                        <span>{formData.alunosVinculados.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <div>
              {currentStep !== "pessoais" && (
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
                  Cadastrar Responsável
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
