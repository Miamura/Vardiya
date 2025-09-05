import React, { useState, useEffect } from "react";
import { Calendar, User, Coffee, Moon, Sun, Home, Zap, Shield, Timer } from "lucide-react";

const ShiftTracker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const startDate = new Date("2025-08-13");
  const shifts = [
    {
      name: "Sabah",
      hours: "04:00 - 14:00",
      color: "from-amber-400 via-orange-400 to-red-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      icon: Sun,
      emoji: "🌅"
    },
    {
      name: "Sabah",
      hours: "04:00 - 14:00",
      color: "from-amber-400 via-orange-400 to-red-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      icon: Sun,
      emoji: "🌅"
    },
    {
      name: "Akşam",
      hours: "12:00 - 24:00",
      color: "from-blue-500 via-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      icon: Coffee,
      emoji: "🌆"
    },
    {
      name: "Akşam",
      hours: "12:00 - 24:00",
      color: "from-blue-500 via-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      icon: Coffee,
      emoji: "🌆"
    },
    {
      name: "Gece",
      hours: "16:00 - 08:00",
      color: "from-indigo-600 via-purple-600 to-slate-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-slate-100",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-800",
      icon: Moon,
      emoji: "🌙"
    },
    {
      name: "Gece",
      hours: "16:00 - 08:00",
      color: "from-indigo-600 via-purple-600 to-slate-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-slate-100",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-800",
      icon: Moon,
      emoji: "🌙"
    },
    {
      name: "Tatil",
      hours: "Tatil Günü",
      color: "from-emerald-400 via-green-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800",
      icon: Home,
      emoji: "🏖️"
    },
    {
      name: "Tatil",
      hours: "Tatil Günü",
      color: "from-emerald-400 via-green-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800",
      icon: Home,
      emoji: "🏖️"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getShiftForDate = (date) => {
    const daysDiff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
    if (daysDiff < 0) return null;
    const shiftIndex = daysDiff % 8;
    return shifts[shiftIndex];
  };

  const getCurrentShift = () => {
    return getShiftForDate(currentTime);
  };

  const isWorkingNow = () => {
    const shift = getCurrentShift();
    if (!shift || shift.name === "Tatil") return false;

    const hour = currentTime.getHours();

    if (shift.name === "Sabah" && hour >= 4 && hour < 14) return true;
    if (shift.name === "Akşam" && hour >= 12 && hour < 24) return true;
    if (shift.name === "Gece" && (hour >= 16 || hour < 8)) return true;

    return false;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getNextShifts = (days = 7) => {
    const nextShifts = [];
    for (let i = 0; i <= days; i++) {
      const date = new Date(currentTime);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      const shift = getShiftForDate(date);
      if (shift) {
        nextShifts.push({
          date: date,
          shift: shift,
          isToday: i === 0,
        });
      }
    }
    return nextShifts;
  };

  const currentShift = getCurrentShift();
  const nextShifts = getNextShifts();
  const working = isWorkingNow();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-2/3 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <Shield className="w-8 h-8 text-cyan-400 mr-3" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              VARDIYA
            </h1>
            <Zap className="w-8 h-8 text-purple-400 ml-3" />
          </div>
          <p className="text-gray-300 text-lg font-medium">
            Modern Shift Tracking System
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Status Dashboard */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Current Time Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Timer className="w-6 h-6 text-cyan-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-300">Şu Anki Zaman</h3>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-gray-400">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Current Shift Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            {currentShift ? (
              <>
                <div className="flex items-center mb-4">
                  <currentShift.icon className="w-6 h-6 text-gray-300 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-300">Mevcut Vardiya</h3>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">{currentShift.emoji}</span>
                  <span className="text-2xl font-bold text-white">{currentShift.name}</span>
                </div>
                <div className="text-sm text-gray-400 mb-3">{currentShift.hours}</div>
                {currentShift.name !== "Tatil" && (
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    working 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${working ? "bg-green-400" : "bg-gray-400"}`}></div>
                    {working ? "Çalışıyor" : "Çalışmıyor"}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-400">
                <p>Vardiya başlangıç: 13 Ağustos 2025</p>
              </div>
            )}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-cyan-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Önümüzdeki 7 Gün</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nextShifts.map((item, index) => (
              <div
                key={index}
                className={`relative p-5 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  item.isToday
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/50"
                    : `${item.shift.bgColor} ${item.shift.borderColor} bg-opacity-10 border-opacity-30`
                } backdrop-blur-sm`}
              >
                {item.isToday && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      BUGÜN
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.shift.emoji}</span>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${item.shift.color} text-white`}>
                    {item.shift.name}
                  </div>
                </div>
                <div className="text-white font-semibold mb-1">
                  {item.date.toLocaleDateString("tr-TR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="text-sm text-gray-400">{item.shift.hours}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shift Pattern Overview */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-purple-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">8 Günlük Vardiya Döngüsü</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
              <div className="text-3xl mb-2">🌅</div>
              <div className="text-white font-bold mb-1">2 Gün Sabah</div>
              <div className="text-sm text-gray-400">04:00 - 14:00</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <div className="text-3xl mb-2">🌆</div>
              <div className="text-white font-bold mb-1">2 Gün Akşam</div>
              <div className="text-sm text-gray-400">12:00 - 24:00</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-indigo-500/10 to-slate-600/10 border border-indigo-500/20 rounded-xl">
              <div className="text-3xl mb-2">🌙</div>
              <div className="text-white font-bold mb-1">2 Gün Gece</div>
              <div className="text-sm text-gray-400">16:00 - 08:00</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
              <div className="text-3xl mb-2">🏖️</div>
              <div className="text-white font-bold mb-1">2 Gün Tatil</div>
              <div className="text-sm text-gray-400">İstirahat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftTracker;