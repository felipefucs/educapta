"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { X, School, Settings, CheckCircle } from "lucide-react"
import { FormField } from "@/components/common/form-field"
import { LoadingButton } from "@/components/common/loading-button"
import { toast } from "sonner"
import { createTurma, updateTurma, type Turma, type CreateTurmaData, type UpdateTurmaData } from "@/lib/api/turmas"

interface TurmaFormProps {
  editingTurma?: Turma | null
  onSuccess: () => void
  onCancel: () => void
}

export function TurmaForm({ editingTurma, onSuccess, onCancel }: TurmaFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("basicos")
  const [formData, setFormData] = useState({
    nome: "",
    serie: "",
    periodo: "",
    capacidade: "",
    professor: "",
    sala: "",
    anoLetivo: "2024",
  })

  // Inicializar formulário com dados de edição
  useEffect(() => {
    if (editingTurma) {
      setFormData({
        nome: editingTurma.nome || "",
        serie: editingTurma.serie || "",
        periodo: editingTurma.periodo || "",
        capacidade: editingTurma.capacidade?.toString() || "",
        professor: editingTurma.professor || "",
        sala: editingTurma.sala || "",
        anoLetivo: editingTurma.anoLetivo?.toString() || "2024",
      })
    }
  }, [editingTurma])

  const serieOptions = [
    { value: "bercario", label: "Berçário" },
    { value: "maternal", label: "Maternal" },
    { value: "pre1", label: "Pré I" },
    { value: "pre2", label: "Pré II" },
    { value: "1ano", label: "1º Ano" },
    { value: "2ano", label: "2º Ano" },
    { value: "3ano", label: "3º Ano" },
    { value: "4ano", label: "4º Ano" },
    { value: "5ano", label: "5º Ano" },
  ]

  const periodoOptions = [
    { value: "matutino", label: "Matutino" },
    { value: "vespertino", label: "Vespertino" },
    { value: "integral", label: "Integral" },
    { value: "noturno", label: "Noturno" },
  ]

  const anoLetivoOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      
      const turmaData = {
        escolaId: "escola123", // Por enquanto usando escola padrão
        nome: formData.nome,
        serie: formData.serie,
        periodo: formData.periodo as "matutino" | "vespertino" | "integral",
        capacidade: parseInt(formData.capacidade),
        anoLetivo: parseInt(formData.anoLetivo),
        professor: formData.professor || undefined,
        sala: formData.sala || undefined
      }

      if (editingTurma) {
        // Atualizar turma existente
        const updateData: UpdateTurmaData = {
          nome: turmaData.nome,
          serie: turmaData.serie,
          periodo: turmaData.periodo,
          capacidade: turmaData.capacidade,
          anoLetivo: turmaData.anoLetivo,
          professor: turmaData.professor,
          sala: turmaData.sala
        }
        await updateTurma(editingTurma.id, updateData)
        toast.success("Turma atualizada com sucesso")
      } else {
        // Criar nova turma
        const createData: CreateTurmaData = turmaData
        await createTurma(createData)
        toast.success("Turma criada com sucesso")
      }
      
      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar turma:", error)
      toast.error(editingTurma ? "Erro ao atualizar turma" : "Erro ao criar turma")
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { id: "basicos", label: "Dados Básicos", icon: School },
    { id: "configuracoes", label: "Configurações", icon: Settings },
    { id: "confirmacao", label: "Confirmação", icon: CheckCircle },
  ]

  const canProceed = () => {
    switch (currentStep) {
      case "basicos":
        return formData.nome && formData.serie && formData.periodo
      case "configuracoes":
        return formData.capacidade && formData.anoLetivo
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
            <School className="h-5 w-5" />
            {editingTurma ? "Editar Turma" : "Criar Nova Turma"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {editingTurma ? "Atualize os dados da turma" : "Configure uma nova turma em etapas"}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}>
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
            <TabsContent value="basicos" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Dados Básicos da Turma</h3>
                <div className="grid gap-6">
                  <FormField
                    label="Nome da Turma"
                    id="nome"
                    placeholder="Ex: 1º Ano A"
                    value={formData.nome}
                    onChange={(value) => handleInputChange("nome", value)}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Série"
                      id="serie"
                      type="select"
                      placeholder="Selecione a série"
                      value={formData.serie}
                      onChange={(value) => handleInputChange("serie", value)}
                      options={serieOptions}
                      required
                    />
                    <FormField
                      label="Período"
                      id="periodo"
                      type="select"
                      placeholder="Selecione o período"
                      value={formData.periodo}
                      onChange={(value) => handleInputChange("periodo", value)}
                      options={periodoOptions}
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuracoes" className="space-y-6 mt-4">
              <div>
                <h3 className="text-xl font-semibold mb-6">Configurações da Turma</h3>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Capacidade"
                      id="capacidade"
                      type="number"
                      placeholder="25"
                      value={formData.capacidade}
                      onChange={(value) => handleInputChange("capacidade", value)}
                      required
                    />
                    <FormField
                      label="Ano Letivo"
                      id="anoLetivo"
                      type="select"
                      placeholder="Selecione o ano"
                      value={formData.anoLetivo}
                      onChange={(value) => handleInputChange("anoLetivo", value)}
                      options={anoLetivoOptions}
                      required
                    />
                  </div>
                  <FormField
                    label="Professor Responsável"
                    id="professor"
                    placeholder="Nome do professor"
                    value={formData.professor}
                    onChange={(value) => handleInputChange("professor", value)}
                  />
                  <FormField
                    label="Sala"
                    id="sala"
                    placeholder="Ex: Sala 101"
                    value={formData.sala}
                    onChange={(value) => handleInputChange("sala", value)}
                  />

                </div>
              </div>
            </TabsContent>

            <TabsContent value="confirmacao" className="space-y-6 mt-4">
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Confirmar Criação</h3>
                <p className="text-muted-foreground mb-8">
                  Revise os dados e confirme a criação da turma <strong>{formData.nome}</strong>
                </p>

                <div className="bg-slate-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Nome:</span>
                        <span>{formData.nome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Série:</span>
                        <span>{serieOptions.find((s) => s.value === formData.serie)?.label || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Período:</span>
                        <span>{periodoOptions.find((p) => p.value === formData.periodo)?.label || "-"}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Capacidade:</span>
                        <span>{formData.capacidade} alunos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Professor:</span>
                        <span>{formData.professor || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sala:</span>
                        <span>{formData.sala || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <div>
              {currentStep !== "basicos" && (
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
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>

              {currentStep === "confirmacao" ? (
                <LoadingButton type="submit" loading={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
                  Criar Turma
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
