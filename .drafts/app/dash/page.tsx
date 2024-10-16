'use client'
import { Button } from '@/components/base/button'
import CopyToClipboard from '@/components/copy-to-clipboard'
import { cn } from '@/lib/utils'
import { format, getDayOfYear, getDaysInYear } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

type Goal = {
  id: number
  title: string
  completed: boolean
}

type Project = {
  id: number
  title: string
  status: 'Planning' | 'In Progress' | 'Ongoing' | 'Completed'
}

type Task = {
  id: number
  title: string
  completed: boolean
}

type Habit = {
  id: number
  title: string
  streak: number
  lastCompleted: Date | null
}

type Mood = 'Great' | 'Good' | 'Okay' | 'Bad' | 'Terrible'

const YearGoals = ({
  goals,
  onToggleCompletion
}: {
  goals: Goal[]
  onToggleCompletion: (id: number) => void
}) => (
  <div>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Year Goals</h2>
    <ul>
      {goals.map((goal) => (
        <li key={goal.id} className="mb-2 flex items-center">
          <input
            type="checkbox"
            checked={goal.completed}
            onChange={() => onToggleCompletion(goal.id)}
            className="mr-2"
          />
          <span className={cn(goal.completed && 'line-through')}>{goal.title}</span>
        </li>
      ))}
    </ul>
  </div>
)

const CurrentProjects = ({
  projects,
  onUpdateStatus
}: {
  projects: Project[]
  onUpdateStatus: (id: number, status: Project['status']) => void
}) => (
  <div>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Current Projects</h2>
    <ul>
      {projects.map((project) => (
        <li key={project.id} className="mb-2 flex items-center justify-between">
          <span>{project.title}</span>
          <select
            value={project.status}
            onChange={(e) =>
              onUpdateStatus(project.id, e.target.value as Project['status'])
            }
            className="ml-2 rounded border p-1"
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </li>
      ))}
    </ul>
  </div>
)

const DailyTasks = ({
  tasks,
  onToggleCompletion
}: {
  tasks: Task[]
  onToggleCompletion: (id: number) => void
}) => (
  <div>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Daily Tasks</h2>
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="mb-2 flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
            className="mr-2"
          />
          <span className={cn(task.completed && 'line-through')}>{task.title}</span>
        </li>
      ))}
    </ul>
  </div>
)

const YearProgressBar = ({ progress }: { progress: number }) => (
  <>
    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral">
      <div
        className="h-2 bg-primary transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
    <p className="mt-2 text-sm text-neutral-fade">
      Year progress: {progress.toFixed(2)}%
    </p>
  </>
)

const InspirationalQuote = ({ quote }: { quote: string }) => (
  <>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Inspirational Quote</h2>
    <div className="shadow-sm flex items-center justify-between rounded-lg bg-neutral-fade p-6">
      <p className="text-lg italic">{quote}</p>
      <CopyToClipboard code={quote} />
    </div>
  </>
)

const QuickLinks = () => (
  <>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Quick Links</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Button className="w-full">GitHub</Button>
      <Button className="w-full">LinkedIn</Button>
      <Button className="w-full">Portfolio</Button>
      <Button className="w-full">Blog</Button>
    </div>
  </>
)

const HabitTracker = ({
  habits,
  onUpdateStreak
}: {
  habits: Habit[]
  onUpdateStreak: (id: number) => void
}) => (
  <div>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Habit Tracker</h2>
    <ul>
      {habits.map((habit) => (
        <li key={habit.id} className="mb-2 flex items-center justify-between">
          <span>{habit.title}</span>
          <div>
            <span className="mr-2">Streak: {habit.streak}</span>
            <Button onClick={() => onUpdateStreak(habit.id)}>Complete</Button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const MoodTracker = ({
  mood,
  onMoodChange
}: {
  mood: Mood
  onMoodChange: (mood: Mood) => void
}) => (
  <div>
    <h2 className="mb-4 mt-10 text-2xl font-semibold">Today's Mood</h2>
    <select
      value={mood}
      onChange={(e) => onMoodChange(e.target.value as Mood)}
      className="rounded border p-2"
    >
      <option value="Great">Great</option>
      <option value="Good">Good</option>
      <option value="Okay">Okay</option>
      <option value="Bad">Bad</option>
      <option value="Terrible">Terrible</option>
    </select>
  </div>
)

const ProductivityChart = ({ data }: { data: number[] }) => {
  const chartData = [
    { name: 'Mon', score: data[0] },
    { name: 'Tue', score: data[1] },
    { name: 'Wed', score: data[2] },
    { name: 'Thu', score: data[3] },
    { name: 'Fri', score: data[4] },
    { name: 'Sat', score: data[5] },
    { name: 'Sun', score: data[6] }
  ]

  return (
    <div>
      <h2 className="mb-4 mt-10 text-2xl font-semibold">Weekly Productivity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((time) => time - 1), 1000)
    } else if (time === 0) {
      setIsActive(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
  }

  return (
    <div>
      <h2 className="mb-4 mt-10 text-2xl font-semibold">Pomodoro Timer</h2>
      <div className="mb-4 text-4xl font-bold">{`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}</div>
      <Button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</Button>
      <Button onClick={resetTimer} className="ml-2">
        Reset
      </Button>
    </div>
  )
}

export default function Dash() {
  const [yearGoals, setYearGoals] = useState<Goal[]>([
    { id: 1, title: 'Learn a new programming language', completed: false },
    { id: 2, title: 'Contribute to an open-source project', completed: false },
    { id: 3, title: 'Launch a side project', completed: false },
    { id: 4, title: 'Read 12 technical books', completed: false }
  ])

  const [currentProjects, setCurrentProjects] = useState<Project[]>([
    { id: 1, title: 'Personal Portfolio Website', status: 'In Progress' },
    { id: 2, title: 'Task Management App', status: 'Planning' },
    { id: 3, title: 'Machine Learning Course', status: 'Ongoing' }
  ])

  const [dailyTasks, setDailyTasks] = useState<Task[]>([
    { id: 1, title: 'Code for 2 hours', completed: false },
    { id: 2, title: 'Read a technical article', completed: false },
    { id: 3, title: 'Exercise for 30 minutes', completed: false }
  ])

  const [yearProgress, setYearProgress] = useState(0)

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, title: 'Meditate', streak: 0, lastCompleted: null },
    { id: 2, title: 'Exercise', streak: 0, lastCompleted: null },
    { id: 3, title: 'Write', streak: 0, lastCompleted: null }
  ])

  const [mood, setMood] = useState<Mood>('Good')
  const [productivityData, setProductivityData] = useState<number[]>([
    70, 65, 80, 75, 68, 72, 78
  ])

  useEffect(() => {
    const updateYearProgress = () => {
      const dateNow = new Date()
      setYearProgress((getDayOfYear(dateNow) / getDaysInYear(dateNow)) * 100)
    }

    updateYearProgress()
    const timer = setInterval(updateYearProgress, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(timer)
  }, [])

  const inspirationalQuote =
    'The only way to do great work is to love what you do. - Steve Jobs'

  const toggleCompletion = useCallback(
    (setter: React.Dispatch<React.SetStateAction<any[]>>) => (id: number) => {
      setter((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      )
    },
    []
  )

  const updateProjectStatus = useCallback(
    (projectId: number, newStatus: Project['status']) => {
      setCurrentProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, status: newStatus } : project
        )
      )
    },
    []
  )

  const updateHabitStreak = useCallback((id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak:
                habit.lastCompleted?.toDateString() === new Date().toDateString()
                  ? habit.streak
                  : habit.streak + 1,
              lastCompleted: new Date()
            }
          : habit
      )
    )
  }, [])

  const handleMoodChange = useCallback((newMood: Mood) => {
    setMood(newMood)
    // Here you could also save the mood to a database or local storage
  }, [])

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Personal Dashboard</h1>
      <p className="mb-4 text-xl">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
      <YearProgressBar progress={yearProgress} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <YearGoals
            goals={yearGoals}
            onToggleCompletion={toggleCompletion(setYearGoals)}
          />
          <CurrentProjects
            projects={currentProjects}
            onUpdateStatus={updateProjectStatus}
          />
        </div>
        <div>
          <DailyTasks
            tasks={dailyTasks}
            onToggleCompletion={toggleCompletion(setDailyTasks)}
          />
          <HabitTracker habits={habits} onUpdateStreak={updateHabitStreak} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <MoodTracker mood={mood} onMoodChange={handleMoodChange} />
        <Pomodoro />
      </div>
      <ProductivityChart data={productivityData} />
      <InspirationalQuote quote={inspirationalQuote} />
      <QuickLinks />
    </div>
  )
}
