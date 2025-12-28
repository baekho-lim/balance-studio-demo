'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, User, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react'

// Import demo data
import scheduleData from '@/data/demo/pilates-schedule.json'
import classesData from '@/data/demo/pilates-classes.json'
import instructorsData from '@/data/demo/pilates-instructors.json'

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const DAY_LABELS: Record<DayOfWeek, { en: string; ko: string }> = {
  monday: { en: 'Mon', ko: '월' },
  tuesday: { en: 'Tue', ko: '화' },
  wednesday: { en: 'Wed', ko: '수' },
  thursday: { en: 'Thu', ko: '목' },
  friday: { en: 'Fri', ko: '금' },
  saturday: { en: 'Sat', ko: '토' },
  sunday: { en: 'Sun', ko: '일' },
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
  'all-levels': 'bg-blue-100 text-blue-700',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  'all-levels': 'All Levels',
}

// Get class and instructor data
function getClassById(id: string) {
  return classesData.find(c => c.id === id)
}

function getInstructorById(id: string) {
  return instructorsData.find(i => i.id === id)
}

// Get schedule for a specific day
function getScheduleForDay(day: DayOfWeek) {
  return scheduleData
    .filter(slot => slot.dayOfWeek === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}

export default function PilatesSchedulePage() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday')
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week')

  const daySchedule = getScheduleForDay(selectedDay)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/demo" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
                ← Back to Demo
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
              <p className="text-gray-500 mt-1">View and book our weekly classes</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week View
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'week' ? (
          /* Week View */
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {DAYS.map(day => (
                <div
                  key={day}
                  className={`p-4 text-center font-medium ${
                    day === 'saturday' || day === 'sunday'
                      ? 'bg-gray-50 text-gray-600'
                      : 'text-gray-900'
                  }`}
                >
                  <div className="text-lg">{DAY_LABELS[day].en}</div>
                  <div className="text-sm text-gray-400">{DAY_LABELS[day].ko}</div>
                </div>
              ))}
            </div>

            {/* Schedule Grid */}
            <div className="grid grid-cols-7">
              {DAYS.map(day => {
                const slots = getScheduleForDay(day)
                return (
                  <div
                    key={day}
                    className={`min-h-[400px] p-2 border-r border-gray-200 last:border-r-0 ${
                      day === 'saturday' || day === 'sunday' ? 'bg-gray-50' : ''
                    }`}
                  >
                    {slots.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm mt-8">No classes</p>
                    ) : (
                      <div className="space-y-2">
                        {slots.map(slot => {
                          const classInfo = getClassById(slot.classId)
                          const instructor = getInstructorById(slot.instructorId)
                          if (!classInfo || !instructor) return null

                          const isFull = slot.status === 'full'
                          const spotsLeft = slot.maxParticipants - slot.currentParticipants

                          return (
                            <div
                              key={slot.id}
                              className={`p-3 rounded-lg text-sm cursor-pointer transition-all hover:shadow-md ${
                                isFull
                                  ? 'bg-gray-100 opacity-60'
                                  : 'bg-blue-50 hover:bg-blue-100'
                              }`}
                            >
                              <div className="font-medium text-gray-900 mb-1">
                                {classInfo.name.en}
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                                <Clock className="w-3 h-3" />
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                                <User className="w-3 h-3" />
                                {instructor.name.en}
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <Users className="w-3 h-3" />
                                {isFull ? (
                                  <span className="text-red-600 font-medium">Full</span>
                                ) : (
                                  <span className="text-green-600">{spotsLeft} spots</span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Day View */
          <div>
            {/* Day Selector */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => {
                  const idx = DAYS.indexOf(selectedDay)
                  setSelectedDay(DAYS[(idx - 1 + 7) % 7])
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedDay === day
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {DAY_LABELS[day].en}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const idx = DAYS.indexOf(selectedDay)
                  setSelectedDay(DAYS[(idx + 1) % 7])
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Schedule */}
            <div className="space-y-4">
              {daySchedule.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">No classes scheduled for this day</p>
                </div>
              ) : (
                daySchedule.map(slot => {
                  const classInfo = getClassById(slot.classId)
                  const instructor = getInstructorById(slot.instructorId)
                  if (!classInfo || !instructor) return null

                  const isFull = slot.status === 'full'
                  const spotsLeft = slot.maxParticipants - slot.currentParticipants

                  return (
                    <div
                      key={slot.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {classInfo.name.en}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[classInfo.level]}`}>
                              {LEVEL_LABELS[classInfo.level]}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4">
                            {classInfo.shortDescription?.en || classInfo.description.en.slice(0, 120) + '...'}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {instructor.name.en}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {slot.room}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {slot.currentParticipants}/{slot.maxParticipants} booked
                            </div>
                          </div>
                        </div>

                        <div className="ml-6">
                          {isFull ? (
                            <button
                              disabled
                              className="px-6 py-3 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                            >
                              Class Full
                            </button>
                          ) : (
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                              Book Now
                              <span className="block text-xs font-normal opacity-80">
                                {spotsLeft} spots left
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 p-4 bg-white rounded-xl">
          <h3 className="font-medium text-gray-900 mb-3">Class Levels</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(LEVEL_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[key]}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
