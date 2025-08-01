"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { X, User, Heart, Users, CheckCircle } from "lucide-react"
import { FormField } from "@/components/common/form-field"
import { LoadingButton } from "@/components/common/loading-button"
import { toast } from "sonner"
import { createAluno, updateAluno, type Aluno } from "@/lib/api/alunos"

interface AlunoFormProps {
  onClose: () => void
  onSave: (success: boolean) => void
  editingAluno?: Aluno | null
}

export function AlunoForm({ onClose, onSave, editingAluno }: AlunoFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("pessoais")
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    endereco: "",
    turma: "",
    necessidadesEspeciais: "",
    medicamentos: "",
    alergias: "",
    contatoEmergencia: "",
    nomeResponsavel: "",
    cpfResponsavel: "",
    telefoneResponsavel: "",
    emailResponsavel: "",
    parentesco: "",
  })

  // Initialize form with editing data if provided
  useEffect(() => {
    if (editingAluno) {
      console.log('Initializing form with editing data:', editingAluno)
      const newFormData = {
        nome: editingAluno.nome || "",
        dataNascimento: editingAluno.dataNascimento 
          ? new Date(editingAluno.dataNascimento).toISOString().split('T')[0] 
          : "",
        cpf: editingAluno.cpf || "",
        endereco: editingAluno.endereco || "",
        turma: editingAluno.turma || "",
        necessidadesEspeciais: editingAluno.necessidadesEspeciais || "",
        medicamentos: editingAluno.medicamentos || "",
        alergias: editingAluno.alergias || "",
        contatoEmergencia: editingAluno.contatoEmergencia || "",
        nomeResponsavel: editingAluno.responsavel || "",
        cpfResponsavel: "",
        telefoneResponsavel: editingAluno.telefone || "",
        emailResponsavel: editingAluno.email || "",
        parentesco: "",
      }
      console.log('Setting form data with turma:', newFormData.turma)
      setFormData(newFormData)
    } else {
      // Reset form when not editing
      setFormData({
        nome: "",
        dataNascimento: "",
        cpf: "",
        endereco: "",
        turma: "",
        necessidadesEspeciais: "",
        medicamentos: "",
        alergias: "",
        contatoEmergencia: "",
        nomeResponsavel: "",
        cpfResponsavel: "",
        telefoneResponsavel: "",
        emailResponsavel: "",
        parentesco: "",
      })
    }
  }, [editingAluno])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Prepare data for API
      const apiData = {
        escolaId: "cmdsw8c390000o1084nanq19w", // Using the actual school ID from database
        nome: formData.nome,
        dataNascimento: formData.dataNascimento || undefined,
        cpf: formData.cpf || undefined,
        endereco: formData.endereco || undefined,
        turma: formData.turma || undefined,
        necessidadesEspeciais: formData.necessidadesEspeciais || undefined,
        medicamentos: formData.medicamentos || undefined,
        alergias: formData.alergias || undefined,
        contatoEmergencia: formData.contatoEmergencia || undefined,
        responsavel: formData.nomeResponsavel || undefined,
        telefone: formData.telefoneResponsavel || undefined,
        email: formData.emailResponsavel || undefined,
        status: "matriculado" as const,
      }

      if (editingAluno) {
        // Update existing student
        await updateAluno(editingAluno.id, apiData)
        toast.success("Aluno atualizado com sucesso!")
      } else {
        // Create new student
        await createAluno(apiData)
        toast.success("Aluno criado com sucesso!")
      }
      
      onSave(true) // Success
    } catch (error) {
      console.error("Error saving student:", error)
      toast.error(editingAluno ? "Erro ao atualizar aluno" : "Erro ao criar aluno")
      onSave(false) // Failure
    } finally {
      setIsLoading(false)
    }
  }

  const turmaOptions = [
    { value: "1ano-a", label: "1º Ano A" },
    { value: "2ano-a", label: "2º Ano A" },
    { value: "3ano-a", label: "3º Ano A" },
  ]

  const parentescoOptions = [
    { value: "pai", label: "Pai" },
    { value: "mae", label: "Mãe" },
    { value: "responsavel", label: "Responsável Legal" },
  ]

  const steps = [
    { id: "pessoais", label: "Dados Pessoais", icon: User },
    { id: "medicos", label: "Dados Médicos", icon: Heart },
    { id: "responsavel", label: "Responsável", icon: Users },
    { id: "confirmacao", label: "Confirmação", icon: CheckCircle },
  ]

  const canProceed = () => {
    switch (currentStep) {
      case "pessoais":
        return formData.nome && formData.dataNascimento && formData.turma
      case "medicos":
        return formData.contatoEmergencia
      case "responsavel":
        return (
          formData.nomeResponsavel && formData.telefoneResponsavel && formData.emailResponsavel && formData.parentesco
        )
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
            Cadastrar Novo Aluno
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Preencha os dados do aluno em etapas</p>
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
                <h3 className="text-xl font-semibold mb-6">Dados Pessoais do Aluno</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Nome Completo"
                    id="nome"
                    placeholder="Digite o nome completo do aluno"
                    value={formData.nome}
                    onChange={(value) => handleInputChange("nome", value)}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Data de Nascimento"
                      id="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(value) => handleInputChange("dataNascimento", value)}
                      required
                    />
                    <FormField
                      label="CPF"
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(value) => handleInputChange("cpf", value)}
                    />
                  </div>
                  <FormField
                    label="Endereço"
                    id="endereco"
                    type="textarea"
                    placeholder="Endereço completo do aluno"
                    value={formData.endereco}
                    onChange={(value) => handleInputChange("endereco", value)}
                  />
                  <FormField
                    label="Turma"
                    id="turma"
                    type="select"
                    placeholder="Selecione a turma"
                    value={formData.turma}
                    onChange={(value) => {
                      console.log('Turma dropdown value changed to:', value)
                      handleInputChange("turma", value)
                    }}
                    options={turmaOptions}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medicos" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Informações Médicas e de Saúde</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Necessidades Especiais"
                    id="necessidades"
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
                    placeholder="Liste alergias conhecidas (alimentares, medicamentos, etc.)"
                    value={formData.alergias}
                    onChange={(value) => handleInputChange("alergias", value)}
                  />
                  <FormField
                    label="Contato de Emergência"
                    id="emergencia"
                    placeholder="Nome e telefone para emergências"
                    value={formData.contatoEmergencia}
                    onChange={(value) => handleInputChange("contatoEmergencia", value)}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="responsavel" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Dados do Responsável</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Nome do Responsável"
                    id="nomeResponsavel"
                    placeholder="Nome completo do responsável"
                    value={formData.nomeResponsavel}
                    onChange={(value) => handleInputChange("nomeResponsavel", value)}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="CPF"
                      id="cpfResponsavel"
                      placeholder="000.000.000-00"
                      value={formData.cpfResponsavel}
                      onChange={(value) => handleInputChange("cpfResponsavel", value)}
                    />
                    <FormField
                      label="Telefone"
                      id="telefoneResponsavel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefoneResponsavel}
                      onChange={(value) => handleInputChange("telefoneResponsavel", value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="E-mail"
                      id="emailResponsavel"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.emailResponsavel}
                      onChange={(value) => handleInputChange("emailResponsavel", value)}
                      required
                    />
                    <FormField
                      label="Parentesco"
                      id="parentesco"
                      type="select"
                      placeholder="Selecione o parentesco"
                      value={formData.parentesco}
                      onChange={(value) => handleInputChange("parentesco", value)}
                      options={parentescoOptions}
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="confirmacao" className="space-y-6 mt-4">
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Confirmar Cadastro</h3>
                <p className="text-muted-foreground mb-8">
                  Revise os dados e confirme o cadastro do aluno <strong>{formData.nome}</strong>
                </p>

                <div className="bg-slate-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Aluno:</span>
                        <span>{formData.nome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Data Nascimento:</span>
                        <span>
                          {formData.dataNascimento
                            ? new Date(formData.dataNascimento).toLocaleDateString("pt-BR")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Turma:</span>
                        <span>{turmaOptions.find((t) => t.value === formData.turma)?.label || "-"}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Responsável:</span>
                        <span>{formData.nomeResponsavel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Telefone:</span>
                        <span>{formData.telefoneResponsavel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">E-mail:</span>
                        <span>{formData.emailResponsavel}</span>
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
                  Cadastrar Aluno
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
