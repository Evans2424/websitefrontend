"use client"

import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"

export default function PerformanceNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Atuação não encontrada</h1>
        <Link href="/" className="text-red-500 hover:text-red-400 flex items-center justify-center">
          <FaArrowLeft className="mr-2" /> Voltar à página inicial
        </Link>
      </div>
    </div>
  )
}