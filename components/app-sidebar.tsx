"use client"

import type * as React from "react"
import {
  GraduationCap,
  School,
  FileText,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  Target,
  UserCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LogoutButton } from "@/components/logout-button"

// Menu items
const data = {
  navMain: [
    {
      title: "Captação",
      items: [
        {
          title: "Funil de Matrículas",
          url: "/dashboard/funil",
          icon: Target,
        },
      ],
    },
    {
      title: "Gestão Acadêmica",
      items: [
        {
          title: "Alunos",
          url: "/dashboard/alunos",
          icon: GraduationCap,
        },
        {
          title: "Responsáveis",
          url: "/dashboard/responsaveis",
          icon: UserCheck,
        },
        {
          title: "Turmas",
          url: "/dashboard/turmas",
          icon: School,
        },
      ],
    },
    {
      title: "Administrativo",
      items: [
        {
          title: "Contratos",
          url: "/dashboard/contratos",
          icon: FileText,
        },
        {
          title: "Pagamentos",
          url: "/dashboard/pagamentos",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Comunicação",
      items: [
        {
          title: "Mensagens",
          url: "/dashboard/comunicacao",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Relatórios",
      items: [
        {
          title: "Relatórios",
          url: "/dashboard/relatorios",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Sistema",
      items: [
        {
          title: "Configurações",
          url: "/dashboard/configuracoes",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Educapta
            </h2>
            <p className="text-xs text-muted-foreground">Gestão de Matrículas</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <LogoutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
