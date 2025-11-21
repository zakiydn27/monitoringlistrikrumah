"use client"

import { useState, useEffect } from "react"
import { Activity, Zap, Battery, TrendingUp, CheckCircle, Cpu, Settings, Sun, Moon, AlertTriangle } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false) // Toggle untuk tampilan pengaturan

  // 👇 Data Personalisasi
  const [homeName, setHomeName] = useState("Rumahku")
  const [costPerKwh, setCostPerKwh] = useState(1699.53)
  const [powerLimit, setPowerLimit] = useState(5000) // dalam Watt

  // 👇 Tambahan FIX Hydration
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  // END FIX

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // 👇 Data Energi (simulasi)
  const energyData = {
    totalConsumption: 24.5,
    currentUsage: 3.2 * 1000, // dalam Watt
    voltage: 220,
    devices: [
      { id: 1, name: "AC Ruang Tengah", usage: 1.8 * 1000, status: "active", icon: "❄️" },
      { id: 2, name: "Lampu Utama", usage: 0.3 * 1000, status: "active", icon: "💡" },
      { id: 3, name: "Kulkas", usage: 0.5 * 1000, status: "active", icon: "🧊" },
      { id: 4, name: "TV", usage: 0.2 * 1000, status: "inactive", icon: "📺" },
      { id: 5, name: "Mesin Cuci", usage: 0.8 * 1000, status: "active", icon: "🧺" },
      { id: 6, name: "Komputer", usage: 0.6 * 1000, status: "inactive", icon: "💻" },
    ],
  }

  // 👇 Cek apakah melewati batas daya
  const isOverLimit = energyData.currentUsage > powerLimit

  // 👇 Tambahkan alert jika melewati batas
  let alerts = [
    ...(isOverLimit ? [{
      id: 0,
      message: `⚠️ Daya saat ini (${energyData.currentUsage}W) melebihi batas (${powerLimit}W)!`,
      type: "danger",
      time: currentTime.toLocaleTimeString("id-ID"),
    }] : []),
    { id: 1, message: "Penggunaan listrik melebihi batas normal", type: "warning", time: "10:30 AM" },
    { id: 2, message: "AC ruang tengah menyala terus menerus", type: "info", time: "09:15 AM" },
  ]

  const calculatedCost = (energyData.totalConsumption * costPerKwh).toFixed(2)

  const powerConsumptionData = [
    { time: "00:00", power: 1200, voltage: 220, current: 5.45 },
    { time: "02:00", power: 800, voltage: 220, current: 3.64 },
    { time: "04:00", power: 600, voltage: 220, current: 2.73 },
    { time: "06:00", power: 1500, voltage: 220, current: 6.82 },
    { time: "08:00", power: 2800, voltage: 220, current: 12.73 },
    { time: "10:00", power: 3500, voltage: 220, current: 15.91 },
    { time: "12:00", power: 4200, voltage: 220, current: 19.09 },
    { time: "14:00", power: 3800, voltage: 220, current: 17.27 },
    { time: "16:00", power: 4500, voltage: 220, current: 20.45 },
    { time: "18:00", power: 5200, voltage: 220, current: 23.64 },
    { time: "20:00", power: 4800, voltage: 220, current: 21.82 },
    { time: "22:00", power: 2200, voltage: 220, current: 10.0 },
  ]

  const backendInfo = {
    endpoints: [
      { method: "GET", path: "/api/energy", description: "Get current energy data" },
      { method: "WS", path: "/ws/energy", description: "WebSocket for real-time updates" },
    ],
    systemStatus: "online",
    lastUpdate: "2025-11-20 10:30:15",
    connectedDevices: 1,
  }

  // Fungsi untuk menyimpan pengaturan
  const handleSaveSettings = () => {
    alert("Pengaturan berhasil disimpan!")
    setShowSettings(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
      {/* Header */}
      <header className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Monitoring Listrik {homeName}
                </h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Rumah Pintar - Real-time Monitoring
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Settings className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <div className="text-right">
                <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {isClient ? currentTime.toLocaleTimeString("id-ID") : ""}
                </div>
                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {isClient
                    ? currentTime.toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Popup Settings */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Pengaturan Personalisasi</h2>
            <div className="space-y-4">
              <div>
                <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Nama Rumah</label>
                <input
                  type="text"
                  value={homeName}
                  onChange={(e) => setHomeName(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div>
                <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Tarif Listrik per kWh (Rp)</label>
                <input
                  type="number"
                  value={costPerKwh}
                  onChange={(e) => setCostPerKwh(Number(e.target.value))}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div>
                <label className={`block mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Batas Daya Maksimal (Watt)</label>
                <input
                  type="number"
                  value={powerLimit}
                  onChange={(e) => setPowerLimit(Number(e.target.value))}
                  className={`w-full p-2 rounded border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
                  }`}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className={`px-4 py-2 rounded ${
                  isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Batal
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        <div className="mb-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg flex items-center ${
                alert.type === "danger"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : alert.type === "warning"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              <div>
                <span className="font-medium">{alert.message}</span> — {alert.time}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Total Penggunaan
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {energyData.totalConsumption} kWh
                </p>
              </div>
              <div className={`${isDarkMode ? "bg-blue-900" : "bg-blue-100"} p-3 rounded-full`}>
                <Activity className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Daya Saat Ini</p>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {energyData.currentUsage} W
                </p>
              </div>
              <div className={`${isDarkMode ? "bg-green-900" : "bg-green-100"} p-3 rounded-full`}>
                <Zap className={`h-6 w-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Tegangan</p>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {energyData.voltage} V
                </p>
              </div>
              <div className={`${isDarkMode ? "bg-yellow-900" : "bg-yellow-100"} p-3 rounded-full`}>
                <Battery className={`h-6 w-6 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Biaya Bulan Ini
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Rp {Number(calculatedCost).toLocaleString("id-ID")}
                </p>
              </div>
              <div className={`${isDarkMode ? "bg-purple-900" : "bg-purple-100"} p-3 rounded-full`}>
                <TrendingUp className={`h-6 w-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
              </div>
            </div>
            <div className={`mt-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Tarif: Rp {costPerKwh.toLocaleString("id-ID")}/kWh
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Power Consumption Chart */}
          <div className="lg:col-span-2">
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
            >
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
                Grafik Konsumsi Daya (24 Jam)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={powerConsumptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="time" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                    <YAxis
                      stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                      fontSize={12}
                      tickFormatter={(value) => `${value}W`}
                    />
                    <Tooltip
                      contentStyle={
                        isDarkMode
                          ? { backgroundColor: "#1f2937", borderColor: "#374151" }
                          : { backgroundColor: "white", borderColor: "#e5e7eb" }
                      }
                      labelStyle={isDarkMode ? { color: "white" } : { color: "black" }}
                      formatter={(value) => [`${value} W`, "Daya"]}
                      labelFormatter={(label) => `Waktu: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="power"
                      stroke={isDarkMode ? "#3b82f6" : "#2563eb"}
                      fill={isDarkMode ? "url(#colorPowerDark)" : "url(#colorPowerLight)"}
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient
                        id={isDarkMode ? "colorPowerDark" : "colorPowerLight"}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={isDarkMode ? "#3b82f6" : "#2563eb"} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={isDarkMode ? "#3b82f6" : "#2563eb"} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div>
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Backend System
                </h3>
              </div>
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-between p-3 ${isDarkMode ? "bg-green-900/20" : "bg-green-50"} rounded-lg`}
                >
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Status
                  </span>
                  <span className="text-sm text-green-600 font-semibold">ONLINE</span>
                </div>
                <div
                  className={`flex items-center justify-between p-3 ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"} rounded-lg`}
                >
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Last Update
                  </span>
                  <span className="text-sm text-blue-600 font-semibold">{backendInfo.lastUpdate}</span>
                </div>
                <div
                  className={`flex items-center justify-between p-3 ${isDarkMode ? "bg-purple-900/20" : "bg-purple-50"} rounded-lg`}
                >
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Connected Devices
                  </span>
                  <span className="text-sm text-purple-600 font-semibold">{backendInfo.connectedDevices}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  API Endpoints
                </h4>
                <div className="space-y-2">
                  {backendInfo.endpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} rounded`}
                    >
                      <code
                        className={`text-xs font-mono ${isDarkMode ? "bg-gray-600 text-green-400" : "bg-gray-200"} px-2 py-1 rounded`}
                      >
                        {endpoint.method}
                      </code>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                        {endpoint.path}
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {endpoint.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Monitoring */}
        <div className="mt-8">
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
          >
            <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
              Pemantauan Perangkat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {energyData.devices.map((device) => (
                <div
                  key={device.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedDevice === device.id
                      ? isDarkMode
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-blue-500 bg-blue-50"
                      : device.status === "active"
                        ? (isDarkMode ? "border-green-500 bg-green-900/20" : "border-green-200 bg-green-50")
                        : (isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50")
                  }`}
                  onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{device.icon}</span>
                      <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{device.name}</h4>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        device.status === "active"
                          ? isDarkMode
                            ? "bg-green-400"
                            : "bg-green-500"
                          : isDarkMode
                            ? "bg-gray-500"
                            : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Daya:</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {device.usage} W
                    </span>
                  </div>
                  {selectedDevice === device.id && (
                    <div className={`mt-3 pt-3 border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-500 text-white py-1 px-2 rounded text-xs font-medium hover:bg-green-600 transition-colors">
                          ON
                        </button>
                        <button className="flex-1 bg-red-500 text-white py-1 px-2 rounded text-xs font-medium hover:bg-red-600 transition-colors">
                          OFF
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Documentation */}
        <div className="mt-8">
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-sm p-6 border`}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Settings className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Implementasi Backend & Hardware
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Backend Implementation */}
              <div>
                <h4 className={`text-md font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>
                  Backend (Node.js + Express + WebSocket)
                </h4>
                <pre
                  className={`${isDarkMode ? "bg-gray-900 text-green-400" : "bg-gray-900 text-green-400"} p-4 rounded-lg text-xs overflow-x-auto`}
                >
                  {`const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 8080 });

// API endpoint
app.get('/api/energy', (req, res) => {
  const COST_PER_KWH = 1699.53;
  const totalConsumption = 24.5;
  const cost = totalConsumption * COST_PER_KWH;
  
  res.json({
    totalConsumption: totalConsumption,
    currentUsage: 3.2,
    voltage: 220,
    cost: cost,
    costPerKwh: COST_PER_KWH,
    timestamp: new Date().toISOString()
  });
});

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
  
  // Send real-time updates
  const interval = setInterval(() => {
    ws.send(JSON.stringify({
      currentUsage: Math.random() * 5,
      timestamp: new Date().toISOString()
    }));
  }, 1000);
  
  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
                </pre>
              </div>

              {/* Hardware Implementation */}
              <div>
                <h4 className={`text-md font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>
                  Hardware (ESP32/Arduino)
                </h4>
                <pre
                  className={`${isDarkMode ? "bg-gray-900 text-green-400" : "bg-gray-900 text-green-400"} p-4 rounded-lg text-xs overflow-x-auto`}
                >
                  {`#include <WiFi.h>
#include <WebSocketsClient.h>
#include <EmonLib.h>

EnergyMonitor emon1;
WebSocketsClient webSocket;

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverAddress = "YOUR_SERVER_IP";
const int serverPort = 8080;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  
  webSocket.begin(serverAddress, serverPort, "/ws/energy");
  emon1.current(A0, 111.1); // SCT-013 calibration
}

void loop() {
  double Irms = emon1.calcIrms(1480);
  double power = Irms * 220.0; // Assuming 220V
  
  if (webSocket.isConnected()) {
    String data = "{\\"currentUsage\\":" + String(power) + "}";
    webSocket.sendTXT(data);
  }
  
  delay(1000);
  webSocket.loop();
}`}
                </pre>
              </div>
            </div>

            <div className="mt-6">
              <h4 className={`text-md font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>
                Deployment Guide
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"} rounded-lg border`}>
                  <h5 className={`font-medium ${isDarkMode ? "text-blue-300" : "text-blue-900"} mb-2`}>
                    VPS Deployment
                  </h5>
                  <ul className={`text-sm ${isDarkMode ? "text-blue-300" : "text-blue-800"} space-y-1`}>
                    <li>• Install Node.js & PM2</li>
                    <li>• Configure reverse proxy (nginx)</li>
                    <li>• Set up SSL certificate</li>
                    <li>• Configure firewall rules</li>
                  </ul>
                </div>
                <div className={`p-4 ${isDarkMode ? "bg-green-900/20" : "bg-green-50"} rounded-lg border`}>
                  <h5 className={`font-medium ${isDarkMode ? "text-green-300" : "text-green-900"} mb-2`}>
                    Heroku Deployment
                  </h5>
                  <ul className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-800"} space-y-1`}>
                    <li>• Create Procfile</li>
                    <li>• Set environment variables</li>
                    <li>• Deploy using Git</li>
                    <li>• Configure SSL automatically</li>
                  </ul>
                </div>
                <div className={`p-4 ${isDarkMode ? "bg-purple-900/20" : "bg-purple-50"} rounded-lg border`}>
                  <h5 className={`font-medium ${isDarkMode ? "text-purple-300" : "text-purple-900"} mb-2`}>
                    Railway Deployment
                  </h5>
                  <ul className={`text-sm ${isDarkMode ? "text-purple-300" : "text-purple-800"} space-y-1`}>
                    <li>• Connect GitHub repo</li>
                    <li>• Configure environment</li>
                    <li>• Auto-deploy on push</li>
                    <li>• Built-in monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Efficiency Tips */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Tips Hemat Energi</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Matikan perangkat elektronik saat tidak digunakan</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Gunakan lampu LED untuk menghemat listrik</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Atur suhu AC antara 24-26°C untuk efisiensi maksimal</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Gunakan timer untuk perangkat yang tidak perlu menyala 24 jam</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}