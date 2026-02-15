import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#6C3CE1",
  primaryDark: "#4A1FB8",
  primaryLight: "#9B6FFF",
  accent: "#FF6B9D",
  accentWarm: "#FF8A5C",
  success: "#10B981",
  warning: "#F59E0B",
  dark: "#1A1033",
  cardBg: "#F8F6FF",
  white: "#FFFFFF",
  textPrimary: "#1A1033",
  textSecondary: "#6B7280",
};

// ─── DATA ────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    title: "¿Qué es la Inteligencia Artificial?",
    icon: "🤖",
    color: "#6C3CE1",
    capsules: [
      {
        id: "1a",
        title: "IA en palabras sencillas",
        duration: "5 min",
        type: "text",
        content: `La Inteligencia Artificial (IA) es un conjunto de tecnologías que permiten a las computadoras realizar tareas que normalmente requieren inteligencia humana.\n\nPiénsalo así: así como un estudiante aprende de ejemplos y práctica, una IA aprende de datos y experiencia.\n\n🎯 Ejemplos cotidianos de IA:\n• El autocorrector de tu teléfono\n• Las recomendaciones de YouTube\n• El traductor de Google\n• Los filtros de Instagram\n\n💡 Dato clave: La IA NO piensa como un humano. Procesa patrones en datos para dar respuestas útiles.`,
        completed: false,
      },
      {
        id: "1b",
        title: "¿Qué es la IA? - Video explicativo",
        duration: "8 min",
        type: "video",
        videoId: "mJeNghZXtMo",
        videoTitle: "Inteligencia Artificial explicada en 8 minutos",
        videoChannel: "DotCSV",
        content: `En este video aprenderás los conceptos fundamentales de la Inteligencia Artificial de forma visual y entretenida.\n\n📝 Puntos clave del video:\n• Qué es realmente la IA y cómo funciona\n• Diferencia entre IA débil e IA fuerte\n• Machine Learning explicado con ejemplos\n• Por qué la IA es relevante para la educación\n\n💡 Después de ver el video: Piensa en 3 formas en que la IA ya está presente en tu vida diaria como docente.`,
        completed: false,
      },
      {
        id: "1c",
        title: "Tipos de IA que usamos a diario",
        duration: "7 min",
        type: "text",
        content: `Existen diferentes tipos de IA según lo que pueden hacer:\n\n📌 IA Generativa: Crea contenido nuevo (texto, imágenes, audio)\n→ Ejemplo: ChatGPT, Gemini, Claude\n\n📌 IA de Reconocimiento: Identifica patrones en datos\n→ Ejemplo: Reconocimiento facial, detección de spam\n\n📌 IA de Recomendación: Sugiere contenido personalizado\n→ Ejemplo: Netflix te sugiere películas, Spotify te sugiere canciones\n\n📌 IA de Automatización: Realiza tareas repetitivas\n→ Ejemplo: Chatbots de atención al cliente\n\n🏫 Para el aula: La IA generativa es la más útil para docentes porque puede ayudarte a crear materiales, planificar clases y personalizar el aprendizaje.`,
        completed: false,
      },
      {
        id: "1d",
        title: "Cómo funciona ChatGPT - Tutorial",
        duration: "10 min",
        type: "video",
        videoId: "AJpoy01FWLw",
        videoTitle: "Cómo usar ChatGPT desde cero - Tutorial completo",
        videoChannel: "Platzi",
        content: `Tutorial práctico para aprender a usar ChatGPT desde cero, ideal para docentes que nunca han usado herramientas de IA.\n\n📝 Lo que aprenderás:\n• Cómo crear tu cuenta gratuita\n• La interfaz paso a paso\n• Tu primer prompt educativo\n• Trucos para obtener mejores respuestas\n\n✏️ Actividad práctica: Después del video, abre ChatGPT y pídele que te ayude a crear una actividad para tu próxima clase.`,
        completed: false,
      },
      {
        id: "1e",
        title: "Mitos y verdades sobre la IA",
        duration: "6 min",
        type: "text",
        content: `Separemos la ficción de la realidad:\n\n❌ MITO: "La IA va a reemplazar a los docentes"\n✅ VERDAD: La IA es una herramienta. El vínculo humano, la empatía y la creatividad del docente son irremplazables.\n\n❌ MITO: "La IA siempre tiene la razón"\n✅ VERDAD: La IA puede cometer errores (alucinaciones). Siempre debes verificar la información.\n\n❌ MITO: "Necesitas ser experto en tecnología para usar IA"\n✅ VERDAD: Si sabes escribir y hacer preguntas, ya tienes la habilidad básica para usar IA.\n\n❌ MITO: "La IA es solo para países desarrollados"\n✅ VERDAD: Herramientas como ChatGPT son accesibles desde cualquier teléfono con internet.\n\n🇻🇪 En Venezuela, la IA puede ser una gran aliada para superar las limitaciones de recursos educativos.`,
        completed: false,
      },
    ],
    quiz: {
      title: "Quiz: Fundamentos de IA",
      questions: [
        { q: "¿Qué tipo de IA es ChatGPT?", options: ["IA de Reconocimiento", "IA Generativa", "IA de Automatización", "IA Predictiva"], correct: 1 },
        { q: "¿Cuál de estas afirmaciones es VERDADERA?", options: ["La IA siempre tiene la razón", "Solo programadores pueden usar IA", "La IA puede cometer errores", "La IA reemplazará a los docentes"], correct: 2 },
        { q: "¿Cuál es un ejemplo de IA en tu vida diaria?", options: ["Una calculadora básica", "El autocorrector del teléfono", "Un libro de texto", "Una pizarra"], correct: 1 },
        { q: "¿Qué habilidad básica necesitas para usar IA generativa?", options: ["Saber programar en Python", "Tener una computadora potente", "Saber escribir y hacer preguntas", "Tener título en informática"], correct: 2 },
      ],
    },
  },
  {
    id: 2,
    title: "Prompts: El arte de hablarle a la IA",
    icon: "💬",
    color: "#3B82F6",
    capsules: [
      {
        id: "2a", title: "¿Qué es un prompt?", duration: "5 min", type: "text",
        content: `Un prompt es la instrucción o pregunta que le das a una IA para obtener una respuesta.\n\n🔑 Piénsalo como dar instrucciones a un asistente muy capaz pero muy literal.\n\nEjemplo de prompt DÉBIL:\n"Haz algo sobre fracciones"\n\nEjemplo de prompt FUERTE:\n"Crea una actividad lúdica para enseñar fracciones a estudiantes de 4to grado, usando ejemplos con pizza, que dure 20 minutos y que incluya trabajo en equipo"\n\n📐 La fórmula básica de un buen prompt:\nROL + TAREA + CONTEXTO + FORMATO\n\nEjemplo:\n"Actúa como un profesor de matemáticas de primaria (ROL). Crea 5 problemas de fracciones (TAREA) para estudiantes de 9 años en Venezuela (CONTEXTO). Preséntalos como un juego con puntos (FORMATO)."`,
        completed: false,
      },
      {
        id: "2b", title: "Prompts en acción - Demostración", duration: "12 min", type: "video",
        videoId: "sTeoEFzVNSc", videoTitle: "Cómo escribir prompts efectivos para educación", videoChannel: "IAula Educativa",
        content: `Video demostrativo donde verás en tiempo real cómo escribir prompts educativos efectivos.\n\n📝 Ejemplos del video:\n• Crear una planificación de clase completa\n• Generar evaluaciones adaptadas al nivel\n• Diseñar actividades grupales creativas\n• Adaptar materiales para estudiantes con necesidades especiales\n\n🎯 Reto: Después del video, escribe 3 prompts propios usando la fórmula ROL + TAREA + CONTEXTO + FORMATO.`,
        completed: false,
      },
      {
        id: "2c", title: "Técnicas de prompting para docentes", duration: "8 min", type: "text",
        content: `Domina estas técnicas y la IA será tu mejor aliada:\n\n1️⃣ TÉCNICA DEL ROL\n"Actúa como un especialista en educación especial..."\n\n2️⃣ TÉCNICA DEL EJEMPLO\n"Aquí tienes un ejemplo de lo que quiero: [ejemplo]. Ahora crea algo similar para..."\n\n3️⃣ TÉCNICA DE PASO A PASO\n"Explícame paso a paso cómo crear una rúbrica de evaluación para..."\n\n4️⃣ TÉCNICA DE RESTRICCIONES\n"Genera una planificación que NO use internet, que sea para 30 estudiantes y que dure exactamente 45 minutos"\n\n5️⃣ TÉCNICA DE MEJORA ITERATIVA\n"Esto está bien, pero hazlo más sencillo / más divertido / agrega más ejemplos / adáptalo para estudiantes con dificultades de aprendizaje"\n\n⭐ Consejo: No te conformes con la primera respuesta. Siempre puedes pedir mejoras.`,
        completed: false,
      },
    ],
    quiz: {
      title: "Quiz: Prompting Educativo",
      questions: [
        { q: "¿Cuál es la fórmula básica de un buen prompt?", options: ["Pregunta + Respuesta", "Rol + Tarea + Contexto + Formato", "Saludo + Pregunta + Despedida", "Título + Descripción"], correct: 1 },
        { q: "¿Cuál es un prompt FUERTE para un docente?", options: ["Haz algo de matemáticas", "Dame información", "Actúa como profesor de 3er grado y crea una actividad de 20 min sobre sumas con material reciclado", "Ayúdame con mi clase"], correct: 2 },
      ],
    },
  },
  { id: 3, title: "Herramientas de IA para el aula", icon: "🛠️", color: "#10B981", locked: true, capsules: [], quiz: null },
  { id: 4, title: "Planificación con IA", icon: "📋", color: "#F59E0B", locked: true, capsules: [], quiz: null },
  { id: 5, title: "Evaluación asistida por IA", icon: "📊", color: "#FF6B9D", locked: true, capsules: [], quiz: null },
];

const LIBRARY_ITEMS = [
  { id: 1, title: "Guía Rápida: Primeros Pasos con ChatGPT para Docentes", type: "PDF", icon: "📄", category: "Guía", size: "2.1 MB", color: "#6C3CE1", description: "Manual ilustrado paso a paso para crear tu cuenta y hacer tus primeros prompts educativos." },
  { id: 2, title: "50 Prompts Listos para el Aula Venezolana", type: "PDF", icon: "📝", category: "Plantilla", size: "1.8 MB", color: "#3B82F6", description: "Prompts adaptados al currículo venezolano para todas las áreas de educación básica y media." },
  { id: 3, title: "Infografía: IA Explicada para Docentes", type: "IMG", icon: "🖼️", category: "Infografía", size: "850 KB", color: "#10B981", description: "Infografía descargable con los conceptos clave de IA en lenguaje sencillo." },
  { id: 4, title: "Planificación Semanal con IA - Plantilla", type: "DOC", icon: "📋", category: "Plantilla", size: "540 KB", color: "#F59E0B", description: "Plantilla editable para integrar herramientas de IA en tu planificación semanal." },
  { id: 5, title: "Glosario de IA para Educadores", type: "PDF", icon: "📖", category: "Referencia", size: "1.2 MB", color: "#FF6B9D", description: "Diccionario con los 40 términos más importantes de IA explicados de forma sencilla." },
  { id: 6, title: "Video-Tutorial: Crear Imágenes con IA", type: "VIDEO", icon: "🎬", category: "Video", size: "45 MB", color: "#8B5CF6", description: "Tutorial paso a paso para generar imágenes educativas usando herramientas gratuitas de IA." },
];

const COMMUNITY_POSTS = [
  { id: 1, user: "María G.", avatar: "👩‍🏫", role: "Docente de Primaria • Caracas", time: "Hace 2 horas", content: "¡Hola colegas! Acabo de usar ChatGPT para crear una actividad de fracciones con recetas de cachapas 🫓 y a mis estudiantes les encantó.", likes: 24, replies: 8, tag: "💡 Experiencia" },
  { id: 2, user: "Carlos R.", avatar: "👨‍🏫", role: "Profesor de Ciencias • Maracaibo", time: "Hace 5 horas", content: "¿Cómo manejan el tema de que los estudiantes usen IA para copiar tareas? Quiero implementar IA pero me preocupa el plagio.", likes: 18, replies: 15, tag: "❓ Pregunta" },
  { id: 3, user: "Ana L.", avatar: "👩‍💻", role: "Coordinadora Pedagógica • Valencia", time: "Hace 1 día", content: "Hice una jornada de formación en IA para 20 docentes usando los materiales de IAula. ¡El módulo de prompts fue el más popular! 🎉", likes: 45, replies: 12, tag: "🏆 Logro" },
  { id: 4, user: "Pedro M.", avatar: "👨‍🎓", role: "Docente de Historia • Barquisimeto", time: "Hace 2 días", content: "Tip: si le dices a la IA 'explícalo como si fueras un llanero contando una historia' las respuestas son mucho más atractivas 😄🐴", likes: 67, replies: 23, tag: "💡 Experiencia" },
];

// ─── YOUTUBE PLAYER ──────────────────────────────────────────

function YouTubePlayer({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedOffline, setSavedOffline] = useState(false);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        borderRadius: 18, overflow: "hidden",
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        background: "#000", position: "relative",
        paddingBottom: "56.25%", height: 0,
      }}>
        {!isPlaying ? (
          <div style={{ position: "absolute", inset: 0, cursor: "pointer" }}
            onClick={() => setIsPlaying(true)}>
            <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { e.target.style.background = "#1a1033"; }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%", background: "rgba(255,0,0,0.9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(255,0,0,0.4)",
              }}>
                <div style={{
                  width: 0, height: 0, marginLeft: 4,
                  borderTop: "14px solid transparent", borderBottom: "14px solid transparent",
                  borderLeft: "22px solid #fff",
                }} />
              </div>
              <p style={{
                color: "#fff", fontSize: 13, fontWeight: 700, marginTop: 12,
                fontFamily: "'Quicksand', sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}>Toca para reproducir</p>
            </div>
            <div style={{
              position: "absolute", top: 10, left: 10,
              background: "rgba(255,0,0,0.9)", color: "#fff",
              padding: "4px 10px", borderRadius: 8,
              fontSize: 11, fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
            }}>▶ YouTube</div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => setSavedOffline(!savedOffline)} style={{
          flex: 1, padding: "10px 14px", borderRadius: 12, border: "none",
          background: savedOffline ? "linear-gradient(135deg, #10B981, #059669)" : "#6C3CE115",
          color: savedOffline ? "#fff" : COLORS.primary,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          {savedOffline ? "✅ Guardado offline" : "📥 Guardar para offline"}
        </button>
        <button onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')} style={{
          padding: "10px 14px", borderRadius: 12, border: `2px solid ${COLORS.primary}25`,
          background: "#fff", color: COLORS.textSecondary,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>🔗 Abrir en YouTube</button>
      </div>
    </div>
  );
}

// ─── CAPSULE TYPE BADGE ──────────────────────────────────────

function CapsuleTypeBadge({ type }) {
  const c = type === "video"
    ? { icon: "🎬", label: "Video", bg: "#FF6B9D15", color: "#FF6B9D" }
    : { icon: "📄", label: "Lectura", bg: "#6C3CE115", color: "#6C3CE1" };
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, color: c.color, background: c.bg,
      padding: "3px 8px", borderRadius: 6, fontFamily: "'Quicksand', sans-serif",
      display: "inline-flex", alignItems: "center", gap: 3,
    }}>{c.icon} {c.label}</span>
  );
}

// ─── COMMON COMPONENTS ───────────────────────────────────────

function SplashScreen({ onFinish }) {
  useEffect(() => { const t = setTimeout(onFinish, 2200); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #6C3CE1 0%, #3B82F6 50%, #8B5CF6 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      animation: "fadeOut 0.5s ease 1.7s forwards",
    }}>
      <div style={{
        width: 100, height: 100, borderRadius: 24,
        background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 50, animation: "bounceIn 0.6s ease",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>🤖</div>
      <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginTop: 20, fontFamily: "'Quicksand', sans-serif", animation: "slideUp 0.6s ease 0.3s both" }}>IAula</h1>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4, fontFamily: "'Quicksand', sans-serif", animation: "slideUp 0.6s ease 0.5s both" }}>Aprende IA para enseñar mejor</p>
      <div style={{ marginTop: 40, width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#fff", borderRadius: 2, animation: "loadBar 1.8s ease forwards" }} />
      </div>
    </div>
  );
}

function BottomNav({ active, onNavigate }) {
  const items = [
    { id: "home", icon: "🏠", label: "Inicio" },
    { id: "learn", icon: "🎓", label: "Formación" },
    { id: "library", icon: "📚", label: "Biblioteca" },
    { id: "community", icon: "💬", label: "Comunidad" },
    { id: "profile", icon: "👤", label: "Perfil" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(108,60,225,0.1)",
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "6px 0 env(safe-area-inset-bottom, 8px)", zIndex: 100,
      boxShadow: "0 -4px 30px rgba(108,60,225,0.08)",
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNavigate(item.id)} style={{
          background: active === item.id ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "transparent",
          border: "none", borderRadius: 16, padding: "6px 14px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          cursor: "pointer", transition: "all 0.3s ease",
        }}>
          <span style={{ fontSize: 20, filter: active === item.id ? "brightness(10)" : "none" }}>{item.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: active === item.id ? "#fff" : COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif" }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Header({ title, subtitle, showBack, onBack }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #6C3CE1 0%, #3B82F6 100%)",
      padding: "env(safe-area-inset-top, 16px) 20px 24px",
      paddingTop: `calc(env(safe-area-inset-top, 16px) + 16px)`,
      borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      {showBack && (
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12,
          padding: "8px 14px", color: "#fff", cursor: "pointer", fontSize: 14,
          marginBottom: 10, fontFamily: "'Quicksand', sans-serif", fontWeight: 600,
        }}>← Volver</button>
      )}
      <h1 style={{ color: "#fff", fontSize: showBack ? 22 : 26, fontWeight: 800, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{title}</h1>
      {subtitle && <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, margin: "4px 0 0", fontFamily: "'Quicksand', sans-serif" }}>{subtitle}</p>}
    </div>
  );
}

function ProgressRing({ progress, size = 48, strokeWidth = 4 }) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(108,60,225,0.15)" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#grad)" strokeWidth={strokeWidth}
        strokeDasharray={c} strokeDashoffset={c - (progress/100)*c} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6C3CE1" /><stop offset="100%" stopColor="#3B82F6" />
      </linearGradient></defs>
    </svg>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────

function HomeScreen({ onNavigate, progress }) {
  const totalCapsules = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.length, 0);
  const completedCapsules = Object.values(progress.capsules || {}).filter(Boolean).length;
  const pct = totalCapsules > 0 ? Math.round((completedCapsules / totalCapsules) * 100) : 0;
  const videoCapsules = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.filter(c => c.type === "video").length, 0);
  const textCapsules = totalCapsules - videoCapsules;

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #6C3CE1 0%, #3B82F6 50%, #8B5CF6 100%)",
        padding: "env(safe-area-inset-top, 20px) 20px 32px",
        paddingTop: `calc(env(safe-area-inset-top, 20px) + 20px)`,
        borderRadius: "0 0 32px 32px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>¡Bienvenido/a a</p>
              <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "4px 0", fontFamily: "'Quicksand', sans-serif" }}>IAula 🤖</h1>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: 0, fontFamily: "'Quicksand', sans-serif", maxWidth: 220 }}>Aprende IA para enseñar mejor</p>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ProgressRing progress={pct} size={64} strokeWidth={5} />
              <span style={{ position: "absolute", color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "'Quicksand', sans-serif" }}>{pct}%</span>
            </div>
          </div>
          <div style={{ marginTop: 20, background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "14px 16px", backdropFilter: "blur(10px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Tu progreso</p>
                <p style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "2px 0 0", fontFamily: "'Quicksand', sans-serif" }}>{completedCapsules} de {totalCapsules} cápsulas completadas</p>
              </div>
              <span style={{ fontSize: 28 }}>{pct >= 100 ? "🏆" : pct >= 50 ? "🔥" : "📚"}</span>
            </div>
            <div style={{ marginTop: 10, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #FF6B9D, #FF8A5C)", width: `${pct}%`, transition: "width 0.8s ease" }} />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Quicksand', sans-serif" }}>📄 {textCapsules} lecturas</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Quicksand', sans-serif" }}>🎬 {videoCapsules} videos</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 100px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 14px", fontFamily: "'Quicksand', sans-serif" }}>⚡ Acceso rápido</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { icon: "🎓", label: "Formación", id: "learn", color: "#6C3CE1" },
            { icon: "📚", label: "Biblioteca", id: "library", color: "#3B82F6" },
            { icon: "💬", label: "Comunidad", id: "community", color: "#10B981" },
          ].map(item => (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              background: "#fff", border: "none", borderRadius: 20, padding: "18px 10px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              cursor: "pointer", boxShadow: "0 4px 20px rgba(108,60,225,0.08)",
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{item.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "'Quicksand', sans-serif" }}>{item.label}</span>
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary, margin: "28px 0 14px", fontFamily: "'Quicksand', sans-serif" }}>🚀 Continúa aprendiendo</h2>
        {MODULES.filter(m => !m.locked).map(mod => {
          const done = mod.capsules.filter(c => progress.capsules?.[c.id]).length;
          const total = mod.capsules.length;
          const vids = mod.capsules.filter(c => c.type === "video").length;
          return (
            <button key={mod.id} onClick={() => onNavigate("module", mod.id)} style={{
              width: "100%", background: "#fff", border: "none", borderRadius: 20,
              padding: 16, marginBottom: 12, cursor: "pointer", textAlign: "left",
              boxShadow: "0 4px 20px rgba(108,60,225,0.06)", display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${mod.color}, ${mod.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{mod.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Módulo {mod.id}</p>
                <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "2px 0 4px", fontFamily: "'Quicksand', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mod.title}</p>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif" }}>📄 {total - vids}</span>
                  {vids > 0 && <span style={{ fontSize: 10, color: "#FF6B9D", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>🎬 {vids}</span>}
                </div>
                <div style={{ height: 4, background: "#f0ecff", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${mod.color}, ${mod.color}99)`, width: `${total > 0 ? (done/total)*100 : 0}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
              <span style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, fontFamily: "'Quicksand', sans-serif", flexShrink: 0 }}>{done}/{total}</span>
            </button>
          );
        })}

        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary, margin: "28px 0 14px", fontFamily: "'Quicksand', sans-serif" }}>🔒 Próximamente</h2>
        {MODULES.filter(m => m.locked).map(mod => (
          <div key={mod.id} style={{ width: "100%", background: "#f9f8fc", borderRadius: 20, padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 14, opacity: 0.6 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "#e8e4f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{mod.icon}</div>
            <div><p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Módulo {mod.id}</p><p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "2px 0 0", fontFamily: "'Quicksand', sans-serif" }}>{mod.title}</p></div>
            <span style={{ marginLeft: "auto", fontSize: 20 }}>🔒</span>
          </div>
        ))}

        <div style={{ marginTop: 24, padding: 20, borderRadius: 20, background: "linear-gradient(135deg, #FF6B9D15, #FF8A5C15)", border: "1px solid #FF6B9D30", textAlign: "center" }}>
          <span style={{ fontSize: 32 }}>🇻🇪</span>
          <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: "8px 0 4px", fontFamily: "'Quicksand', sans-serif" }}>Hecho para docentes venezolanos</p>
          <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Contenido adaptado al currículo y realidad educativa de Venezuela. 100% gratuito y disponible offline.</p>
        </div>
      </div>
    </div>
  );
}

// ─── LEARN SCREEN ────────────────────────────────────────────

function LearnScreen({ onNavigate, progress }) {
  return (
    <div>
      <Header title="Formación" subtitle="Cápsulas de aprendizaje y video-lecciones" />
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ background: "linear-gradient(135deg, #FF6B9D10, #8B5CF610)", border: "1px solid #FF6B9D20", borderRadius: 16, padding: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🎬</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>¡Nuevo! Video-lecciones incluidas</p>
            <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: "2px 0 0", fontFamily: "'Quicksand', sans-serif" }}>Aprende con videos paso a paso. Se pueden guardar para ver offline.</p>
          </div>
        </div>

        {MODULES.map(mod => {
          const done = mod.capsules.filter(c => progress.capsules?.[c.id]).length;
          const total = mod.capsules.length;
          const isLocked = mod.locked;
          const vids = mod.capsules.filter(c => c.type === "video").length;
          return (
            <button key={mod.id} onClick={() => !isLocked && onNavigate("module", mod.id)} disabled={isLocked}
              style={{
                width: "100%", background: isLocked ? "#f5f3fa" : "#fff",
                border: isLocked ? "2px dashed #d4cce8" : "none",
                borderRadius: 24, padding: 20, marginBottom: 16, cursor: isLocked ? "default" : "pointer",
                textAlign: "left", boxShadow: isLocked ? "none" : "0 4px 24px rgba(108,60,225,0.08)",
                opacity: isLocked ? 0.55 : 1, position: "relative", overflow: "hidden",
              }}>
              {!isLocked && done === total && total > 0 && (
                <div style={{ position: "absolute", top: 12, right: 12, background: "linear-gradient(135deg, #10B981, #059669)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, fontFamily: "'Quicksand', sans-serif" }}>✓ Completado</div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: isLocked ? "#e0dbe8" : `linear-gradient(135deg, ${mod.color}, ${mod.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{isLocked ? "🔒" : mod.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: mod.color, margin: 0, fontFamily: "'Quicksand', sans-serif", textTransform: "uppercase", letterSpacing: 0.5 }}>Módulo {mod.id}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, margin: "2px 0", fontFamily: "'Quicksand', sans-serif" }}>{mod.title}</p>
                  {!isLocked && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 11, color: COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif" }}>📄 {total - vids} lecturas</span>
                      {vids > 0 && <span style={{ fontSize: 11, color: "#FF6B9D", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>🎬 {vids} videos</span>}
                      <span style={{ fontSize: 11, color: COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif" }}>· {done}/{total}</span>
                    </div>
                  )}
                  {isLocked && <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Próximamente disponible</p>}
                </div>
              </div>
              {!isLocked && total > 0 && (
                <div style={{ marginTop: 12, height: 6, background: `${mod.color}18`, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${mod.color}, ${mod.color}bb)`, width: `${(done/total)*100}%`, transition: "width 0.5s ease" }} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MODULE SCREEN ───────────────────────────────────────────

function ModuleScreen({ moduleId, onNavigate, progress }) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return null;
  return (
    <div>
      <Header title={`Módulo ${mod.id}`} subtitle={mod.title} showBack onBack={() => onNavigate("learn")} />
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ background: `${mod.color}08`, border: `1px solid ${mod.color}20`, borderRadius: 16, padding: 14, marginBottom: 20, display: "flex", gap: 16, justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}><p style={{ fontSize: 20, fontWeight: 800, color: mod.color, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{mod.capsules.filter(c => c.type === "text").length}</p><p style={{ fontSize: 10, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>📄 Lecturas</p></div>
          <div style={{ width: 1, background: `${mod.color}20` }} />
          <div style={{ textAlign: "center" }}><p style={{ fontSize: 20, fontWeight: 800, color: "#FF6B9D", margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{mod.capsules.filter(c => c.type === "video").length}</p><p style={{ fontSize: 10, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>🎬 Videos</p></div>
          <div style={{ width: 1, background: `${mod.color}20` }} />
          <div style={{ textAlign: "center" }}><p style={{ fontSize: 20, fontWeight: 800, color: COLORS.success, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{mod.capsules.filter(c => progress.capsules?.[c.id]).length}</p><p style={{ fontSize: 10, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>✅ Listas</p></div>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 14px", fontFamily: "'Quicksand', sans-serif" }}>📖 Cápsulas de aprendizaje</h3>
        {mod.capsules.map((cap, i) => {
          const done = progress.capsules?.[cap.id];
          return (
            <button key={cap.id} onClick={() => onNavigate("capsule", moduleId, cap.id)} style={{
              width: "100%", background: done ? `${mod.color}08` : "#fff",
              border: done ? `2px solid ${mod.color}40` : "none",
              borderRadius: 20, padding: 16, marginBottom: 12, cursor: "pointer", textAlign: "left",
              boxShadow: done ? "none" : "0 4px 20px rgba(108,60,225,0.06)",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: done ? "linear-gradient(135deg, #10B981, #059669)" : cap.type === "video" ? "linear-gradient(135deg, #FF6B9D20, #FF6B9D10)" : `${mod.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: done ? 18 : cap.type === "video" ? 20 : 16,
                color: done ? "#fff" : mod.color, fontWeight: 700, flexShrink: 0,
              }}>{done ? "✓" : cap.type === "video" ? "▶" : i + 1}</div>
              <div style={{ flex: 1 }}>
                <CapsuleTypeBadge type={cap.type} />
                <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: "3px 0 0", fontFamily: "'Quicksand', sans-serif" }}>{cap.title}</p>
                <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "2px 0 0", fontFamily: "'Quicksand', sans-serif" }}>⏱ {cap.duration} · {done ? "Completada ✓" : "Pendiente"}</p>
              </div>
            </button>
          );
        })}

        {mod.quiz && (
          <>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary, margin: "24px 0 14px", fontFamily: "'Quicksand', sans-serif" }}>🧩 Reto del módulo</h3>
            <button onClick={() => onNavigate("quiz", moduleId)} style={{
              width: "100%", background: progress.quizzes?.[moduleId] != null ? "#10B98115" : `${mod.color}10`,
              border: `2px solid ${progress.quizzes?.[moduleId] != null ? "#10B98140" : mod.color + "30"}`,
              borderRadius: 20, padding: 20, cursor: "pointer", textAlign: "center",
            }}>
              <span style={{ fontSize: 36 }}>🏆</span>
              <p style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, margin: "8px 0 4px", fontFamily: "'Quicksand', sans-serif" }}>{mod.quiz.title}</p>
              <p style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif", margin: 0 }}>
                {progress.quizzes?.[moduleId] != null ? `Puntaje: ${progress.quizzes[moduleId]}/${mod.quiz.questions.length} · Repetir` : `${mod.quiz.questions.length} preguntas · ¡Pon a prueba lo aprendido!`}
              </p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── CAPSULE SCREEN ──────────────────────────────────────────

function CapsuleScreen({ moduleId, capsuleId, onNavigate, progress, setProgress }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const cap = mod?.capsules.find(c => c.id === capsuleId);
  if (!mod || !cap) return null;
  const done = progress.capsules?.[capsuleId];
  const capIndex = mod.capsules.findIndex(c => c.id === capsuleId);
  const nextCap = mod.capsules[capIndex + 1];

  return (
    <div>
      <Header title={cap.title} subtitle={`Módulo ${mod.id} · ${cap.duration} · ${cap.type === "video" ? "🎬 Video" : "📄 Lectura"}`} showBack onBack={() => onNavigate("module", moduleId)} />
      <div style={{ padding: "20px 20px 100px" }}>
        {cap.type === "video" && cap.videoId && (
          <div>
            <YouTubePlayer videoId={cap.videoId} title={cap.videoTitle || cap.title} />
            <div style={{ background: `${mod.color}08`, border: `1px solid ${mod.color}15`, borderRadius: 16, padding: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>📺</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{cap.videoTitle}</p>
                {cap.videoChannel && <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: "2px 0 0", fontFamily: "'Quicksand', sans-serif" }}>Canal: {cap.videoChannel} · {cap.duration}</p>}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(108,60,225,0.06)" }}>
          {cap.type === "video" && (
            <div style={{ background: "#FFF7ED", borderRadius: 12, padding: 12, marginBottom: 16, border: "1px solid #FDBA7430" }}>
              <p style={{ fontSize: 12, color: "#92400E", margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>📝 Notas y puntos clave del video:</p>
            </div>
          )}
          {cap.content.split("\n").map((line, i) => (
            <p key={i} style={{
              fontSize: 14, lineHeight: 1.7, color: COLORS.textPrimary,
              margin: line === "" ? "12px 0" : "6px 0", fontFamily: "'Quicksand', sans-serif",
              fontWeight: /^[📌🔑🎯💡❌✅⭐🏫🇻🇪📝✏️]/.test(line) || /^[1-5]️⃣/.test(line) ? 700 : 400,
              background: line.startsWith("→") ? `${mod.color}08` : "transparent",
              padding: line.startsWith("→") ? "4px 10px" : 0, borderRadius: 8,
              borderLeft: line.startsWith("→") ? `3px solid ${mod.color}` : "none",
            }}>{line || "\u00A0"}</p>
          ))}
        </div>

        <button onClick={() => setProgress(p => ({ ...p, capsules: { ...p.capsules, [capsuleId]: true } }))} style={{
          width: "100%", marginTop: 20, padding: "16px 24px",
          background: done ? "linear-gradient(135deg, #10B981, #059669)" : `linear-gradient(135deg, ${mod.color}, ${mod.color}cc)`,
          color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: "pointer",
          fontFamily: "'Quicksand', sans-serif", boxShadow: `0 8px 30px ${done ? "#10B98140" : mod.color + "40"}`,
        }}>
          {done ? "✓ Cápsula completada" : cap.type === "video" ? "🎬 Marcar video como visto" : "Marcar como completada"}
        </button>

        {nextCap && (
          <button onClick={() => onNavigate("capsule", moduleId, nextCap.id)} style={{
            width: "100%", marginTop: 10, padding: "14px 24px",
            background: "#fff", border: `2px solid ${mod.color}25`, color: mod.color, borderRadius: 16,
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Siguiente: {nextCap.type === "video" ? "🎬" : "📄"} {nextCap.title} →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ SCREEN ─────────────────────────────────────────────

function QuizScreen({ moduleId, onNavigate, progress, setProgress }) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod?.quiz) return null;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const q = mod.quiz.questions[currentQ];

  const handleAnswer = (idx) => { if (answered) return; setSelected(idx); setAnswered(true); if (idx === q.correct) setScore(s => s + 1); };
  const handleNext = () => { if (currentQ < mod.quiz.questions.length - 1) { setCurrentQ(c => c + 1); setSelected(null); setAnswered(false); } else setFinished(true); };
  useEffect(() => { if (finished) setProgress(p => ({ ...p, quizzes: { ...p.quizzes, [moduleId]: score } })); }, [finished]);

  if (finished) {
    const total = mod.quiz.questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div>
        <Header title="Resultado del Quiz" showBack onBack={() => onNavigate("module", moduleId)} />
        <div style={{ padding: "40px 20px 100px", textAlign: "center" }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 20px", background: pct >= 75 ? "linear-gradient(135deg, #10B981, #059669)" : pct >= 50 ? "linear-gradient(135deg, #F59E0B, #D97706)" : "linear-gradient(135deg, #EF4444, #DC2626)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>{pct >= 75 ? "🏆" : pct >= 50 ? "💪" : "📚"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: COLORS.textPrimary, margin: "0 0 8px", fontFamily: "'Quicksand', sans-serif" }}>{pct >= 75 ? "¡Excelente!" : pct >= 50 ? "¡Buen trabajo!" : "¡Sigue practicando!"}</h2>
          <p style={{ fontSize: 40, fontWeight: 800, color: mod.color, margin: "10px 0", fontFamily: "'Quicksand', sans-serif" }}>{score}/{total}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <button onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); setAnswered(false); setFinished(false); }} style={{ flex: 1, padding: "14px", background: "#fff", border: `2px solid ${mod.color}`, borderRadius: 14, color: mod.color, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>🔄 Repetir</button>
            <button onClick={() => onNavigate("module", moduleId)} style={{ flex: 1, padding: "14px", background: `linear-gradient(135deg, ${mod.color}, ${mod.color}cc)`, border: "none", borderRadius: 14, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>← Volver</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title={mod.quiz.title} subtitle={`Pregunta ${currentQ + 1} de ${mod.quiz.questions.length}`} showBack onBack={() => onNavigate("module", moduleId)} />
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {mod.quiz.questions.map((_, i) => (<div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= currentQ ? mod.color : "#e8e4f0" }} />))}
        </div>
        <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(108,60,225,0.08)" }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 20px", lineHeight: 1.5, fontFamily: "'Quicksand', sans-serif" }}>{q.q}</p>
          {q.options.map((opt, idx) => {
            let bg = "#f8f6ff", border = "2px solid transparent";
            if (answered) { if (idx === q.correct) { bg = "#10B98118"; border = "2px solid #10B981"; } else if (idx === selected) { bg = "#EF444418"; border = "2px solid #EF4444"; } }
            return (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ width: "100%", padding: "14px 16px", background: bg, border, borderRadius: 14, marginBottom: 10, cursor: answered ? "default" : "pointer", textAlign: "left", fontSize: 14, color: COLORS.textPrimary, fontWeight: 600, fontFamily: "'Quicksand', sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: answered && idx === q.correct ? "#10B981" : answered && idx === selected ? "#EF4444" : `${mod.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: answered && (idx === q.correct || idx === selected) ? "#fff" : mod.color, flexShrink: 0 }}>
                  {answered && idx === q.correct ? "✓" : answered && idx === selected ? "✗" : String.fromCharCode(65 + idx)}
                </div>{opt}
              </button>
            );
          })}
          {answered && (
            <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: selected === q.correct ? "#10B98112" : "#F59E0B12", border: `1px solid ${selected === q.correct ? "#10B98130" : "#F59E0B30"}` }}>
              <p style={{ fontSize: 13, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>{selected === q.correct ? "🎉 ¡Correcto!" : `💡 Respuesta correcta: ${q.options[q.correct]}`}</p>
            </div>
          )}
        </div>
        {answered && (
          <button onClick={handleNext} style={{ width: "100%", marginTop: 20, padding: "16px", background: `linear-gradient(135deg, ${mod.color}, ${mod.color}cc)`, color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>
            {currentQ < mod.quiz.questions.length - 1 ? "Siguiente pregunta →" : "Ver resultado 🏆"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── LIBRARY SCREEN ──────────────────────────────────────────

function LibraryScreen() {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", "Guía", "Plantilla", "Infografía", "Referencia", "Video"];
  const filtered = filter === "Todos" ? LIBRARY_ITEMS : LIBRARY_ITEMS.filter(i => i.category === filter);
  return (
    <div>
      <Header title="Biblioteca" subtitle="Material didáctico descargable" />
      <div style={{ padding: "16px 20px 100px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: filter === cat ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "#f0ecff", color: filter === cat ? "#fff" : COLORS.primary, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Quicksand', sans-serif" }}>{cat}</button>
          ))}
        </div>
        {filtered.map(item => (
          <div key={item.id} style={{ background: "#fff", borderRadius: 20, padding: 18, marginBottom: 14, boxShadow: "0 4px 20px rgba(108,60,225,0.06)", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: "2px 8px", borderRadius: 6, fontFamily: "'Quicksand', sans-serif" }}>{item.category}</span>
                <span style={{ fontSize: 10, color: COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif" }}>{item.size}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 4px", fontFamily: "'Quicksand', sans-serif" }}>{item.title}</p>
              <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "0 0 10px", fontFamily: "'Quicksand', sans-serif", lineHeight: 1.4 }}>{item.description}</p>
              <button style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>📥 Descargar para offline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMMUNITY SCREEN ────────────────────────────────────────

function CommunityScreen() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [likedPosts, setLikedPosts] = useState({});
  const handleLike = (id) => { setLikedPosts(p => ({ ...p, [id]: !p[id] })); setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: likedPosts[id] ? p.likes - 1 : p.likes + 1 } : p)); };
  const handlePost = () => { if (!newPost.trim()) return; setPosts([{ id: Date.now(), user: "Tú", avatar: "🧑‍🏫", role: "Docente · IAula", time: "Ahora", content: newPost, likes: 0, replies: 0, tag: "💬 Nuevo" }, ...posts]); setNewPost(""); };
  return (
    <div>
      <Header title="Comunidad" subtitle="Conecta con otros docentes" />
      <div style={{ padding: "16px 20px 100px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 16, marginBottom: 20, boxShadow: "0 4px 20px rgba(108,60,225,0.06)" }}>
          <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Comparte una experiencia, pregunta o consejo..." style={{ width: "100%", minHeight: 80, border: "2px solid #f0ecff", borderRadius: 14, padding: 14, fontSize: 14, fontFamily: "'Quicksand', sans-serif", resize: "vertical", outline: "none", boxSizing: "border-box", background: "#faf9ff" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <button onClick={handlePost} style={{ padding: "10px 24px", borderRadius: 12, border: "none", background: newPost.trim() ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "#e0dbe8", color: "#fff", fontSize: 13, fontWeight: 700, cursor: newPost.trim() ? "pointer" : "default", fontFamily: "'Quicksand', sans-serif" }}>Publicar ✨</button>
          </div>
        </div>
        {posts.map(post => (
          <div key={post.id} style={{ background: "#fff", borderRadius: 20, padding: 18, marginBottom: 14, boxShadow: "0 4px 20px rgba(108,60,225,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #6C3CE115, #3B82F615)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{post.avatar}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{post.user}</p>
                <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{post.role} · {post.time}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.primary, background: "#f0ecff", padding: "4px 10px", borderRadius: 8, fontFamily: "'Quicksand', sans-serif" }}>{post.tag}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.textPrimary, margin: "0 0 14px", fontFamily: "'Quicksand', sans-serif" }}>{post.content}</p>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => handleLike(post.id)} style={{ background: likedPosts[post.id] ? "#FF6B9D15" : "#f8f6ff", border: "none", borderRadius: 10, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: likedPosts[post.id] ? "#FF6B9D" : COLORS.textSecondary, fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>{likedPosts[post.id] ? "❤️" : "🤍"} {post.likes}</button>
              <button style={{ background: "#f8f6ff", border: "none", borderRadius: 10, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: COLORS.textSecondary, fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>💬 {post.replies}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────

function ProfileScreen({ progress }) {
  const totalCapsules = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.length, 0);
  const completedCapsules = Object.values(progress.capsules || {}).filter(Boolean).length;
  const quizzesCompleted = Object.keys(progress.quizzes || {}).length;
  const videosCapsules = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.filter(c => c.type === "video").length, 0);
  const videosCompleted = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.filter(c => c.type === "video" && progress.capsules?.[c.id]).length, 0);
  return (
    <div>
      <Header title="Mi Perfil" subtitle="Tu progreso en IAula" />
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(108,60,225,0.08)", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px", background: "linear-gradient(135deg, #6C3CE1, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 8px 30px rgba(108,60,225,0.25)" }}>🧑‍🏫</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.textPrimary, margin: "0 0 4px", fontFamily: "'Quicksand', sans-serif" }}>Docente IAula</h2>
          <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Nivel: {completedCapsules >= 5 ? "Explorador IA 🚀" : completedCapsules >= 2 ? "Aprendiz IA 🌱" : "Novato IA 📚"}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
          {[
            { label: "Cápsulas", value: `${completedCapsules}/${totalCapsules}`, icon: "📖", color: "#6C3CE1" },
            { label: "Videos vistos", value: `${videosCompleted}/${videosCapsules}`, icon: "🎬", color: "#FF6B9D" },
            { label: "Quizzes", value: `${quizzesCompleted}/${MODULES.filter(m => m.quiz).length}`, icon: "🧩", color: "#3B82F6" },
            { label: "Racha", value: "1 día", icon: "🔥", color: "#F59E0B" },
          ].map(stat => (
            <div key={stat.label} style={{ background: "#fff", borderRadius: 18, padding: 16, boxShadow: "0 4px 16px rgba(108,60,225,0.06)", textAlign: "center" }}>
              <span style={{ fontSize: 24 }}>{stat.icon}</span>
              <p style={{ fontSize: 18, fontWeight: 800, color: stat.color, margin: "6px 0 2px", fontFamily: "'Quicksand', sans-serif" }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, background: "#fff", borderRadius: 20, padding: 20, boxShadow: "0 4px 16px rgba(108,60,225,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 14px", fontFamily: "'Quicksand', sans-serif" }}>⚙️ Configuración</h3>
          {[{ l: "📱 Modo offline activado", on: true }, { l: "📥 Auto-descargar videos en WiFi", on: false }, { l: "🔔 Notificaciones", on: false }, { l: "🌙 Modo oscuro", on: false }].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? "1px solid #f0ecff" : "none" }}>
              <span style={{ fontSize: 14, color: COLORS.textPrimary, fontFamily: "'Quicksand', sans-serif" }}>{item.l}</span>
              <div style={{ width: 42, height: 24, borderRadius: 12, background: item.on ? "#10B981" : "#e0dbe8", position: "relative", cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: item.on ? 20 : 2, transition: "left 0.3s ease", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, padding: 18, borderRadius: 18, background: "linear-gradient(135deg, #FF6B9D12, #FF8A5C12)", border: "1px solid #FF6B9D25", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>💜 IAula es un proyecto abierto para democratizar la IA educativa en Venezuela</p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────

export default function IAulaApp() {
  const [splashDone, setSplashDone] = useState(false);
  const [screen, setScreen] = useState("home");
  const [moduleId, setModuleId] = useState(null);
  const [capsuleId, setCapsuleId] = useState(null);
  const [progress, setProgress] = useState({ capsules: {}, quizzes: {} });
  const scrollRef = useRef(null);

  const navigate = (target, modId, capId) => {
    if (target === "module") { setScreen("module"); setModuleId(modId); }
    else if (target === "capsule") { setScreen("capsule"); setModuleId(modId); setCapsuleId(capId); }
    else if (target === "quiz") { setScreen("quiz"); setModuleId(modId); }
    else { setScreen(target); }
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const activeNav = ["home", "learn", "library", "community", "profile"].includes(screen) ? screen
    : ["module", "capsule", "quiz"].includes(screen) ? "learn" : "home";

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f8f6ff", position: "relative", fontFamily: "'Quicksand', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; background: #f8f6ff; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0; }
        @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
        @keyframes loadBar { from { width: 0; } to { width: 100%; } }
        button:active { transform: scale(0.97) !important; }
      `}</style>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <div ref={scrollRef} style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", paddingBottom: 80, WebkitOverflowScrolling: "touch" }}>
        {screen === "home" && <HomeScreen onNavigate={navigate} progress={progress} />}
        {screen === "learn" && <LearnScreen onNavigate={navigate} progress={progress} />}
        {screen === "module" && <ModuleScreen moduleId={moduleId} onNavigate={navigate} progress={progress} />}
        {screen === "capsule" && <CapsuleScreen moduleId={moduleId} capsuleId={capsuleId} onNavigate={navigate} progress={progress} setProgress={setProgress} />}
        {screen === "quiz" && <QuizScreen moduleId={moduleId} onNavigate={navigate} progress={progress} setProgress={setProgress} />}
        {screen === "library" && <LibraryScreen />}
        {screen === "community" && <CommunityScreen />}
        {screen === "profile" && <ProfileScreen progress={progress} />}
      </div>
      {splashDone && <BottomNav active={activeNav} onNavigate={navigate} />}
    </div>
  );
}
