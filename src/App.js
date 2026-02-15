import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from '@supabase/supabase-js';

// ─── SUPABASE CONFIG ─────────────────────────────────────────
const supabase = createClient(
  'https://yivtlsnqpttcbkkehjpm.supabase.co',
  'sb_publishable_XeooSn0vg6f_LFo6p59SSw_zMa_xAwd'
);

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

const ESTADOS_VENEZUELA = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar",
  "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón",
  "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta",
  "Portuguesa", "Sucre", "Táchira", "Trujillo", "Vargas", "Yaracuy", "Zulia"
];

// ─── DATA ────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1, title: "¿Qué es la Inteligencia Artificial?", icon: "🤖", color: "#6C3CE1",
    capsules: [
      { id: "1a", title: "IA en palabras sencillas", duration: "5 min", type: "text",
        content: `La Inteligencia Artificial (IA) es un conjunto de tecnologías que permiten a las computadoras realizar tareas que normalmente requieren inteligencia humana.\n\nPiénsalo así: así como un estudiante aprende de ejemplos y práctica, una IA aprende de datos y experiencia.\n\n🎯 Ejemplos cotidianos de IA:\n• El autocorrector de tu teléfono\n• Las recomendaciones de YouTube\n• El traductor de Google\n• Los filtros de Instagram\n\n💡 Dato clave: La IA NO piensa como un humano. Procesa patrones en datos para dar respuestas útiles.`, completed: false },
      { id: "1b", title: "¿Qué es la IA? - Video explicativo", duration: "8 min", type: "video",
        videoId: "mJeNghZXtMo", videoTitle: "Inteligencia Artificial explicada en 8 minutos", videoChannel: "DotCSV",
        content: `En este video aprenderás los conceptos fundamentales de la Inteligencia Artificial de forma visual y entretenida.\n\n📝 Puntos clave del video:\n• Qué es realmente la IA y cómo funciona\n• Diferencia entre IA débil e IA fuerte\n• Machine Learning explicado con ejemplos\n• Por qué la IA es relevante para la educación\n\n💡 Después de ver el video: Piensa en 3 formas en que la IA ya está presente en tu vida diaria como docente.`, completed: false },
      { id: "1c", title: "Tipos de IA que usamos a diario", duration: "7 min", type: "text",
        content: `Existen diferentes tipos de IA según lo que pueden hacer:\n\n📌 IA Generativa: Crea contenido nuevo (texto, imágenes, audio)\n→ Ejemplo: ChatGPT, Gemini, Claude\n\n📌 IA de Reconocimiento: Identifica patrones en datos\n→ Ejemplo: Reconocimiento facial, detección de spam\n\n📌 IA de Recomendación: Sugiere contenido personalizado\n→ Ejemplo: Netflix te sugiere películas, Spotify te sugiere canciones\n\n📌 IA de Automatización: Realiza tareas repetitivas\n→ Ejemplo: Chatbots de atención al cliente\n\n🏫 Para el aula: La IA generativa es la más útil para docentes porque puede ayudarte a crear materiales, planificar clases y personalizar el aprendizaje.`, completed: false },
      { id: "1d", title: "Cómo funciona ChatGPT - Tutorial", duration: "10 min", type: "video",
        videoId: "AJpoy01FWLw", videoTitle: "Cómo usar ChatGPT desde cero - Tutorial completo", videoChannel: "Platzi",
        content: `Tutorial práctico para aprender a usar ChatGPT desde cero, ideal para docentes que nunca han usado herramientas de IA.\n\n📝 Lo que aprenderás:\n• Cómo crear tu cuenta gratuita\n• La interfaz paso a paso\n• Tu primer prompt educativo\n• Trucos para obtener mejores respuestas\n\n✏️ Actividad práctica: Después del video, abre ChatGPT y pídele que te ayude a crear una actividad para tu próxima clase.`, completed: false },
      { id: "1e", title: "Mitos y verdades sobre la IA", duration: "6 min", type: "text",
        content: `Separemos la ficción de la realidad:\n\n❌ MITO: "La IA va a reemplazar a los docentes"\n✅ VERDAD: La IA es una herramienta. El vínculo humano, la empatía y la creatividad del docente son irremplazables.\n\n❌ MITO: "La IA siempre tiene la razón"\n✅ VERDAD: La IA puede cometer errores (alucinaciones). Siempre debes verificar la información.\n\n❌ MITO: "Necesitas ser experto en tecnología para usar IA"\n✅ VERDAD: Si sabes escribir y hacer preguntas, ya tienes la habilidad básica para usar IA.\n\n❌ MITO: "La IA es solo para países desarrollados"\n✅ VERDAD: Herramientas como ChatGPT son accesibles desde cualquier teléfono con internet.\n\n🇻🇪 En Venezuela, la IA puede ser una gran aliada para superar las limitaciones de recursos educativos.`, completed: false },
    ],
    quiz: { title: "Quiz: Fundamentos de IA", questions: [
      { q: "¿Qué tipo de IA es ChatGPT?", options: ["IA de Reconocimiento", "IA Generativa", "IA de Automatización", "IA Predictiva"], correct: 1 },
      { q: "¿Cuál de estas afirmaciones es VERDADERA?", options: ["La IA siempre tiene la razón", "Solo programadores pueden usar IA", "La IA puede cometer errores", "La IA reemplazará a los docentes"], correct: 2 },
      { q: "¿Cuál es un ejemplo de IA en tu vida diaria?", options: ["Una calculadora básica", "El autocorrector del teléfono", "Un libro de texto", "Una pizarra"], correct: 1 },
      { q: "¿Qué habilidad básica necesitas para usar IA generativa?", options: ["Saber programar en Python", "Tener una computadora potente", "Saber escribir y hacer preguntas", "Tener título en informática"], correct: 2 },
    ]},
  },
  {
    id: 2, title: "Prompts: El arte de hablarle a la IA", icon: "💬", color: "#3B82F6",
    capsules: [
      { id: "2a", title: "¿Qué es un prompt?", duration: "5 min", type: "text",
        content: `Un prompt es la instrucción o pregunta que le das a una IA para obtener una respuesta.\n\n🔑 Piénsalo como dar instrucciones a un asistente muy capaz pero muy literal.\n\nEjemplo de prompt DÉBIL:\n"Haz algo sobre fracciones"\n\nEjemplo de prompt FUERTE:\n"Crea una actividad lúdica para enseñar fracciones a estudiantes de 4to grado, usando ejemplos con pizza, que dure 20 minutos y que incluya trabajo en equipo"\n\n📐 La fórmula básica de un buen prompt:\nROL + TAREA + CONTEXTO + FORMATO\n\nEjemplo:\n"Actúa como un profesor de matemáticas de primaria (ROL). Crea 5 problemas de fracciones (TAREA) para estudiantes de 9 años en Venezuela (CONTEXTO). Preséntalos como un juego con puntos (FORMATO)."`, completed: false },
      { id: "2b", title: "Prompts en acción - Demostración", duration: "12 min", type: "video",
        videoId: "sTeoEFzVNSc", videoTitle: "Cómo escribir prompts efectivos para educación", videoChannel: "IAula Educativa",
        content: `Video demostrativo donde verás en tiempo real cómo escribir prompts educativos efectivos.\n\n📝 Ejemplos del video:\n• Crear una planificación de clase completa\n• Generar evaluaciones adaptadas al nivel\n• Diseñar actividades grupales creativas\n• Adaptar materiales para estudiantes con necesidades especiales\n\n🎯 Reto: Después del video, escribe 3 prompts propios usando la fórmula ROL + TAREA + CONTEXTO + FORMATO.`, completed: false },
      { id: "2c", title: "Técnicas de prompting para docentes", duration: "8 min", type: "text",
        content: `Domina estas técnicas y la IA será tu mejor aliada:\n\n1️⃣ TÉCNICA DEL ROL\n"Actúa como un especialista en educación especial..."\n\n2️⃣ TÉCNICA DEL EJEMPLO\n"Aquí tienes un ejemplo de lo que quiero: [ejemplo]. Ahora crea algo similar para..."\n\n3️⃣ TÉCNICA DE PASO A PASO\n"Explícame paso a paso cómo crear una rúbrica de evaluación para..."\n\n4️⃣ TÉCNICA DE RESTRICCIONES\n"Genera una planificación que NO use internet, que sea para 30 estudiantes y que dure exactamente 45 minutos"\n\n5️⃣ TÉCNICA DE MEJORA ITERATIVA\n"Esto está bien, pero hazlo más sencillo / más divertido / agrega más ejemplos / adáptalo para estudiantes con dificultades de aprendizaje"\n\n⭐ Consejo: No te conformes con la primera respuesta. Siempre puedes pedir mejoras.`, completed: false },
    ],
    quiz: { title: "Quiz: Prompting Educativo", questions: [
      { q: "¿Cuál es la fórmula básica de un buen prompt?", options: ["Pregunta + Respuesta", "Rol + Tarea + Contexto + Formato", "Saludo + Pregunta + Despedida", "Título + Descripción"], correct: 1 },
      { q: "¿Cuál es un prompt FUERTE para un docente?", options: ["Haz algo de matemáticas", "Dame información", "Actúa como profesor de 3er grado y crea una actividad de 20 min sobre sumas con material reciclado", "Ayúdame con mi clase"], correct: 2 },
    ]},
  },
  { id: 3, title: "Herramientas de IA para el aula", icon: "🛠️", color: "#10B981", locked: true, capsules: [], quiz: null },
  { id: 4, title: "Planificación con IA", icon: "📋", color: "#F59E0B", locked: true, capsules: [], quiz: null },
  { id: 5, title: "Evaluación asistida por IA", icon: "📊", color: "#FF6B9D", locked: true, capsules: [], quiz: null },
];

const LIBRARY_ITEMS = [
  { id: 1, title: "Guía Rápida: Primeros Pasos con ChatGPT", type: "PDF", icon: "📄", category: "Guía", size: "2.1 MB", color: "#6C3CE1", description: "Manual paso a paso para crear tu cuenta y hacer tus primeros prompts educativos." },
  { id: 2, title: "50 Prompts Listos para el Aula Venezolana", type: "PDF", icon: "📝", category: "Plantilla", size: "1.8 MB", color: "#3B82F6", description: "Prompts adaptados al currículo venezolano para educación básica y media." },
  { id: 3, title: "Infografía: IA Explicada para Docentes", type: "IMG", icon: "🖼️", category: "Infografía", size: "850 KB", color: "#10B981", description: "Conceptos clave de IA en lenguaje sencillo." },
  { id: 4, title: "Planificación Semanal con IA - Plantilla", type: "DOC", icon: "📋", category: "Plantilla", size: "540 KB", color: "#F59E0B", description: "Plantilla editable para integrar IA en tu planificación." },
  { id: 5, title: "Glosario de IA para Educadores", type: "PDF", icon: "📖", category: "Referencia", size: "1.2 MB", color: "#FF6B9D", description: "40 términos de IA explicados de forma sencilla." },
  { id: 6, title: "Video-Tutorial: Crear Imágenes con IA", type: "VIDEO", icon: "🎬", category: "Video", size: "45 MB", color: "#8B5CF6", description: "Genera imágenes educativas usando herramientas gratuitas." },
];

const COMMUNITY_POSTS = [
  { id: 1, user: "María G.", avatar: "👩‍🏫", role: "Docente • Caracas", time: "Hace 2 horas", content: "¡Acabo de usar ChatGPT para crear una actividad de fracciones con cachapas 🫓 y a mis estudiantes les encantó!", likes: 24, replies: 8, tag: "💡 Experiencia" },
  { id: 2, user: "Carlos R.", avatar: "👨‍🏫", role: "Profesor • Maracaibo", time: "Hace 5 horas", content: "¿Cómo manejan el tema de que los estudiantes usen IA para copiar tareas?", likes: 18, replies: 15, tag: "❓ Pregunta" },
  { id: 3, user: "Ana L.", avatar: "👩‍💻", role: "Coordinadora • Valencia", time: "Hace 1 día", content: "Hice una jornada de formación en IA para 20 docentes usando IAula. ¡El módulo de prompts fue el más popular! 🎉", likes: 45, replies: 12, tag: "🏆 Logro" },
];

// ─── AUTH SCREEN ─────────────────────────────────────────────

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [estado, setEstado] = useState("");
  const [escuela, setEscuela] = useState("");
  const [nivel, setNivel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message === "Invalid login credentials" ? "Email o contraseña incorrectos" : err.message); }
    else { onAuth(data.user); }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) { setError("Completa todos los campos obligatorios"); return; }
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres"); return; }
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } }
    });
    if (err) { setError(err.message); }
    else {
      // Update profile with extra data
      if (data.user) {
        await supabase.from('profiles').update({
          full_name: fullName, estado, escuela, nivel_educativo: nivel
        }).eq('id', data.user.id);
      }
      setSuccess("¡Cuenta creada! Revisa tu email para confirmar (revisa spam). También puedes iniciar sesión directamente.");
      setMode("login");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 14, border: "2px solid #f0ecff",
    fontSize: 15, fontFamily: "'Quicksand', sans-serif", outline: "none", boxSizing: "border-box",
    background: "#faf9ff", transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 700, color: COLORS.textSecondary, marginBottom: 6,
    display: "block", fontFamily: "'Quicksand', sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #6C3CE1 0%, #3B82F6 50%, #8B5CF6 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 40, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>🤖</div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "12px 0 4px", fontFamily: "'Quicksand', sans-serif" }}>IAula</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Aprende IA para enseñar mejor 🇻🇪</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 28, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          {/* Toggle */}
          <div style={{ display: "flex", background: "#f0ecff", borderRadius: 14, padding: 4, marginBottom: 24 }}>
            <button onClick={() => { setMode("login"); setError(""); }} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", background: mode === "login" ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "transparent", color: mode === "login" ? "#fff" : COLORS.textSecondary, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>Iniciar sesión</button>
            <button onClick={() => { setMode("register"); setError(""); }} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", background: mode === "register" ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "transparent", color: mode === "register" ? "#fff" : COLORS.textSecondary, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>Registrarse</button>
          </div>

          {error && (
            <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "#DC2626", margin: 0, fontFamily: "'Quicksand', sans-serif" }}>⚠️ {error}</p>
            </div>
          )}

          {success && (
            <div style={{ background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "#059669", margin: 0, fontFamily: "'Quicksand', sans-serif" }}>✅ {success}</p>
            </div>
          )}

          {mode === "register" && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Nombre completo *</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ej: María García" style={inputStyle} />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Correo electrónico *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={inputStyle} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Contraseña *{mode === "register" ? " (mínimo 6 caracteres)" : ""}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>

          {mode === "register" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Estado</label>
                <select value={estado} onChange={e => setEstado(e.target.value)} style={{ ...inputStyle, appearance: "auto" }}>
                  <option value="">Selecciona tu estado</option>
                  {ESTADOS_VENEZUELA.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Escuela / Institución</label>
                <input value={escuela} onChange={e => setEscuela(e.target.value)} placeholder="Nombre de tu escuela" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Nivel educativo</label>
                <select value={nivel} onChange={e => setNivel(e.target.value)} style={{ ...inputStyle, appearance: "auto" }}>
                  <option value="">Selecciona</option>
                  <option value="Preescolar">Preescolar</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Universitario">Universitario</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </>
          )}

          <button onClick={mode === "login" ? handleLogin : handleRegister} disabled={loading}
            style={{
              width: "100%", padding: "16px", borderRadius: 14, border: "none",
              background: loading ? "#a78bfa" : "linear-gradient(135deg, #6C3CE1, #3B82F6)",
              color: "#fff", fontSize: 16, fontWeight: 700, cursor: loading ? "default" : "pointer",
              fontFamily: "'Quicksand', sans-serif", boxShadow: "0 8px 30px rgba(108,60,225,0.3)",
              marginTop: 8,
            }}>
            {loading ? "⏳ Cargando..." : mode === "login" ? "Iniciar sesión →" : "Crear cuenta 🚀"}
          </button>

          {mode === "login" && (
            <p style={{ textAlign: "center", fontSize: 12, color: COLORS.textSecondary, marginTop: 16, fontFamily: "'Quicksand', sans-serif" }}>
              ¿No tienes cuenta?{" "}
              <span onClick={() => setMode("register")} style={{ color: COLORS.primary, fontWeight: 700, cursor: "pointer" }}>Regístrate gratis</span>
            </p>
          )}
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 20, fontFamily: "'Quicksand', sans-serif" }}>
          100% gratuito · Hecho para docentes venezolanos 🇻🇪
        </p>
      </div>
    </div>
  );
}

// ─── YOUTUBE PLAYER ──────────────────────────────────────────

function YouTubePlayer({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.15)", background: "#000", position: "relative", paddingBottom: "56.25%", height: 0 }}>
        {!isPlaying ? (
          <div style={{ position: "absolute", inset: 0, cursor: "pointer" }} onClick={() => setIsPlaying(true)}>
            <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.background = "#1a1033"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(255,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, marginLeft: 4, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "22px solid #fff" }} />
              </div>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginTop: 12, fontFamily: "'Quicksand', sans-serif" }}>Toca para reproducir</p>
            </div>
            <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,0,0,0.9)", color: "#fff", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, fontFamily: "'Quicksand', sans-serif" }}>▶ YouTube</div>
          </div>
        ) : (
          <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title={title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        )}
      </div>
      <button onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')} style={{ marginTop: 10, padding: "8px 16px", borderRadius: 10, border: `2px solid ${COLORS.primary}20`, background: "#fff", color: COLORS.textSecondary, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>🔗 Abrir en YouTube</button>
    </div>
  );
}

function CapsuleTypeBadge({ type }) {
  const c = type === "video" ? { icon: "🎬", label: "Video", bg: "#FF6B9D15", color: "#FF6B9D" } : { icon: "📄", label: "Lectura", bg: "#6C3CE115", color: "#6C3CE1" };
  return <span style={{ fontSize: 10, fontWeight: 700, color: c.color, background: c.bg, padding: "3px 8px", borderRadius: 6, fontFamily: "'Quicksand', sans-serif", display: "inline-flex", alignItems: "center", gap: 3 }}>{c.icon} {c.label}</span>;
}

// ─── COMMON COMPONENTS ───────────────────────────────────────

function BottomNav({ active, onNavigate }) {
  const items = [{ id: "home", icon: "🏠", label: "Inicio" }, { id: "learn", icon: "🎓", label: "Formación" }, { id: "library", icon: "📚", label: "Biblioteca" }, { id: "community", icon: "💬", label: "Comunidad" }, { id: "profile", icon: "👤", label: "Perfil" }];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(108,60,225,0.1)", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "6px 0 env(safe-area-inset-bottom, 8px)", zIndex: 100 }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNavigate(item.id)} style={{ background: active === item.id ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "transparent", border: "none", borderRadius: 16, padding: "6px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <span style={{ fontSize: 20, filter: active === item.id ? "brightness(10)" : "none" }}>{item.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: active === item.id ? "#fff" : COLORS.textSecondary, fontFamily: "'Quicksand', sans-serif" }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Header({ title, subtitle, showBack, onBack }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #6C3CE1, #3B82F6)", padding: "env(safe-area-inset-top, 16px) 20px 24px", paddingTop: `calc(env(safe-area-inset-top, 16px) + 16px)`, borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      {showBack && <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, padding: "8px 14px", color: "#fff", cursor: "pointer", fontSize: 14, marginBottom: 10, fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>← Volver</button>}
      <h1 style={{ color: "#fff", fontSize: showBack ? 22 : 26, fontWeight: 800, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{title}</h1>
      {subtitle && <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, margin: "4px 0 0", fontFamily: "'Quicksand', sans-serif" }}>{subtitle}</p>}
    </div>
  );
}

function ProgressRing({ progress, size = 48, strokeWidth = 4 }) {
  const r = (size - strokeWidth) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(108,60,225,0.15)" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#grad)" strokeWidth={strokeWidth} strokeDasharray={c} strokeDashoffset={c - (progress/100)*c} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#6C3CE1" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient></defs>
    </svg>
  );
}

// ─── HOME ────────────────────────────────────────────────────

function HomeScreen({ onNavigate, progress, profile }) {
  const totalCaps = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.length, 0);
  const doneCaps = Object.values(progress.capsules || {}).filter(Boolean).length;
  const pct = totalCaps > 0 ? Math.round((doneCaps / totalCaps) * 100) : 0;
  const vids = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.filter(c => c.type === "video").length, 0);
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #6C3CE1 0%, #3B82F6 50%, #8B5CF6 100%)", padding: "env(safe-area-inset-top, 20px) 20px 32px", paddingTop: `calc(env(safe-area-inset-top, 20px) + 20px)`, borderRadius: "0 0 32px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>¡Hola, {profile?.full_name?.split(" ")[0] || "Docente"}!</p>
              <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "4px 0", fontFamily: "'Quicksand', sans-serif" }}>IAula 🤖</h1>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ProgressRing progress={pct} size={64} strokeWidth={5} />
              <span style={{ position: "absolute", color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "'Quicksand', sans-serif" }}>{pct}%</span>
            </div>
          </div>
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "14px 16px" }}>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{doneCaps} de {totalCaps} cápsulas completadas</p>
            <div style={{ marginTop: 8, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #FF6B9D, #FF8A5C)", width: `${pct}%`, transition: "width 0.8s ease" }} />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Quicksand', sans-serif" }}>📄 {totalCaps - vids} lecturas</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Quicksand', sans-serif" }}>🎬 {vids} videos</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[{ icon: "🎓", label: "Formación", id: "learn", color: "#6C3CE1" }, { icon: "📚", label: "Biblioteca", id: "library", color: "#3B82F6" }, { icon: "💬", label: "Comunidad", id: "community", color: "#10B981" }].map(item => (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{ background: "#fff", border: "none", borderRadius: 20, padding: "18px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,60,225,0.08)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{item.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "'Quicksand', sans-serif" }}>{item.label}</span>
            </button>
          ))}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 14px", fontFamily: "'Quicksand', sans-serif" }}>🚀 Continúa aprendiendo</h2>
        {MODULES.filter(m => !m.locked).map(mod => {
          const done = mod.capsules.filter(c => progress.capsules?.[c.id]).length;
          return (
            <button key={mod.id} onClick={() => onNavigate("module", mod.id)} style={{ width: "100%", background: "#fff", border: "none", borderRadius: 20, padding: 16, marginBottom: 12, cursor: "pointer", textAlign: "left", boxShadow: "0 4px 20px rgba(108,60,225,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${mod.color}, ${mod.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{mod.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>Módulo {mod.id}: {mod.title}</p>
                <div style={{ marginTop: 6, height: 4, background: "#f0ecff", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: mod.color, width: `${(done/mod.capsules.length)*100}%` }} />
                </div>
              </div>
              <span style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>{done}/{mod.capsules.length}</span>
            </button>
          );
        })}
        {MODULES.filter(m => m.locked).map(mod => (
          <div key={mod.id} style={{ background: "#f9f8fc", borderRadius: 20, padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 14, opacity: 0.5 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "#e8e4f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{mod.icon}</div>
            <div><p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{mod.title}</p><p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "2px 0 0", fontFamily: "'Quicksand', sans-serif" }}>Próximamente 🔒</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEARN, MODULE, CAPSULE, QUIZ ────────────────────────────

function LearnScreen({ onNavigate, progress }) {
  return (
    <div>
      <Header title="Formación" subtitle="Cápsulas y video-lecciones" />
      <div style={{ padding: "20px 20px 100px" }}>
        {MODULES.map(mod => {
          const done = mod.capsules.filter(c => progress.capsules?.[c.id]).length;
          const vids = mod.capsules.filter(c => c.type === "video").length;
          return (
            <button key={mod.id} onClick={() => !mod.locked && onNavigate("module", mod.id)} disabled={mod.locked}
              style={{ width: "100%", background: mod.locked ? "#f5f3fa" : "#fff", border: mod.locked ? "2px dashed #d4cce8" : "none", borderRadius: 24, padding: 20, marginBottom: 16, cursor: mod.locked ? "default" : "pointer", textAlign: "left", boxShadow: mod.locked ? "none" : "0 4px 24px rgba(108,60,225,0.08)", opacity: mod.locked ? 0.55 : 1, position: "relative" }}>
              {!mod.locked && done === mod.capsules.length && mod.capsules.length > 0 && <div style={{ position: "absolute", top: 12, right: 12, background: "linear-gradient(135deg, #10B981, #059669)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>✓ Completado</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: mod.locked ? "#e0dbe8" : `linear-gradient(135deg, ${mod.color}, ${mod.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{mod.locked ? "🔒" : mod.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: mod.color, margin: 0, fontFamily: "'Quicksand', sans-serif", textTransform: "uppercase" }}>Módulo {mod.id}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, margin: "2px 0", fontFamily: "'Quicksand', sans-serif" }}>{mod.title}</p>
                  {!mod.locked && <div style={{ display: "flex", gap: 8 }}><span style={{ fontSize: 11, color: COLORS.textSecondary }}>📄 {mod.capsules.length - vids}</span>{vids > 0 && <span style={{ fontSize: 11, color: "#FF6B9D", fontWeight: 600 }}>🎬 {vids}</span>}<span style={{ fontSize: 11, color: COLORS.textSecondary }}>· {done}/{mod.capsules.length}</span></div>}
                  {mod.locked && <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0 }}>Próximamente</p>}
                </div>
              </div>
              {!mod.locked && mod.capsules.length > 0 && <div style={{ marginTop: 12, height: 6, background: `${mod.color}18`, borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, background: mod.color, width: `${(done/mod.capsules.length)*100}%` }} /></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ModuleScreen({ moduleId, onNavigate, progress }) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return null;
  return (
    <div>
      <Header title={`Módulo ${mod.id}`} subtitle={mod.title} showBack onBack={() => onNavigate("learn")} />
      <div style={{ padding: "20px 20px 100px" }}>
        {mod.capsules.map((cap, i) => {
          const done = progress.capsules?.[cap.id];
          return (
            <button key={cap.id} onClick={() => onNavigate("capsule", moduleId, cap.id)} style={{ width: "100%", background: done ? `${mod.color}08` : "#fff", border: done ? `2px solid ${mod.color}40` : "none", borderRadius: 20, padding: 16, marginBottom: 12, cursor: "pointer", textAlign: "left", boxShadow: done ? "none" : "0 4px 20px rgba(108,60,225,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: done ? "linear-gradient(135deg, #10B981, #059669)" : cap.type === "video" ? "#FF6B9D20" : `${mod.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 18 : 16, color: done ? "#fff" : mod.color, fontWeight: 700, flexShrink: 0 }}>{done ? "✓" : cap.type === "video" ? "▶" : i + 1}</div>
              <div style={{ flex: 1 }}>
                <CapsuleTypeBadge type={cap.type} />
                <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: "3px 0 0", fontFamily: "'Quicksand', sans-serif" }}>{cap.title}</p>
                <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "2px 0 0" }}>⏱ {cap.duration}</p>
              </div>
            </button>
          );
        })}
        {mod.quiz && (
          <button onClick={() => onNavigate("quiz", moduleId)} style={{ width: "100%", background: `${mod.color}10`, border: `2px solid ${mod.color}30`, borderRadius: 20, padding: 20, marginTop: 10, cursor: "pointer", textAlign: "center" }}>
            <span style={{ fontSize: 36 }}>🏆</span>
            <p style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary, margin: "8px 0 4px", fontFamily: "'Quicksand', sans-serif" }}>{mod.quiz.title}</p>
            <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0 }}>{progress.quizzes?.[moduleId] != null ? `Puntaje: ${progress.quizzes[moduleId]}/${mod.quiz.questions.length}` : `${mod.quiz.questions.length} preguntas`}</p>
          </button>
        )}
      </div>
    </div>
  );
}

function CapsuleScreen({ moduleId, capsuleId, onNavigate, progress, onComplete }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const cap = mod?.capsules.find(c => c.id === capsuleId);
  if (!mod || !cap) return null;
  const done = progress.capsules?.[capsuleId];
  const nextCap = mod.capsules[mod.capsules.findIndex(c => c.id === capsuleId) + 1];
  return (
    <div>
      <Header title={cap.title} subtitle={`Módulo ${mod.id} · ${cap.duration}`} showBack onBack={() => onNavigate("module", moduleId)} />
      <div style={{ padding: "20px 20px 100px" }}>
        {cap.type === "video" && cap.videoId && (
          <>
            <YouTubePlayer videoId={cap.videoId} title={cap.videoTitle || cap.title} />
            <div style={{ background: `${mod.color}08`, borderRadius: 16, padding: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>📺</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{cap.videoTitle}</p>
                {cap.videoChannel && <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: "2px 0 0" }}>Canal: {cap.videoChannel}</p>}
              </div>
            </div>
          </>
        )}
        <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(108,60,225,0.06)" }}>
          {cap.type === "video" && <div style={{ background: "#FFF7ED", borderRadius: 12, padding: 12, marginBottom: 16 }}><p style={{ fontSize: 12, color: "#92400E", margin: 0, fontWeight: 600 }}>📝 Notas y puntos clave:</p></div>}
          {cap.content.split("\n").map((line, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textPrimary, margin: line === "" ? "12px 0" : "6px 0", fontFamily: "'Quicksand', sans-serif", fontWeight: /^[📌🔑🎯💡❌✅⭐🏫🇻🇪📝✏️]/.test(line) || /^[1-5]️⃣/.test(line) ? 700 : 400, background: line.startsWith("→") ? `${mod.color}08` : "transparent", padding: line.startsWith("→") ? "4px 10px" : 0, borderRadius: 8, borderLeft: line.startsWith("→") ? `3px solid ${mod.color}` : "none" }}>{line || "\u00A0"}</p>
          ))}
        </div>
        <button onClick={() => onComplete(capsuleId, moduleId)} style={{ width: "100%", marginTop: 20, padding: "16px", background: done ? "linear-gradient(135deg, #10B981, #059669)" : `linear-gradient(135deg, ${mod.color}, ${mod.color}cc)`, color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>
          {done ? "✓ Completada" : cap.type === "video" ? "🎬 Marcar video como visto" : "Marcar como completada"}
        </button>
        {nextCap && <button onClick={() => onNavigate("capsule", moduleId, nextCap.id)} style={{ width: "100%", marginTop: 10, padding: "14px", background: "#fff", border: `2px solid ${mod.color}25`, color: mod.color, borderRadius: 16, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>Siguiente: {nextCap.title} →</button>}
      </div>
    </div>
  );
}

function QuizScreen({ moduleId, onNavigate, progress, onQuizComplete }) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod?.quiz) return null;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const q = mod.quiz.questions[currentQ];
  const handleAnswer = (idx) => { if (answered) return; setSelected(idx); setAnswered(true); if (idx === q.correct) setScore(s => s + 1); };
  const handleNext = () => { if (currentQ < mod.quiz.questions.length - 1) { setCurrentQ(c => c + 1); setSelected(null); setAnswered(false); } else { setFinished(true); } };
  useEffect(() => { if (finished) onQuizComplete(moduleId, score, mod.quiz.questions.length); }, [finished]);

  if (finished) {
    const total = mod.quiz.questions.length, pct = Math.round((score / total) * 100);
    return (
      <div>
        <Header title="Resultado" showBack onBack={() => onNavigate("module", moduleId)} />
        <div style={{ padding: "40px 20px 100px", textAlign: "center" }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 20px", background: pct >= 75 ? "linear-gradient(135deg, #10B981, #059669)" : "linear-gradient(135deg, #F59E0B, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>{pct >= 75 ? "🏆" : "💪"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: COLORS.textPrimary, fontFamily: "'Quicksand', sans-serif" }}>{pct >= 75 ? "¡Excelente!" : "¡Buen trabajo!"}</h2>
          <p style={{ fontSize: 40, fontWeight: 800, color: mod.color, fontFamily: "'Quicksand', sans-serif" }}>{score}/{total}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <button onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); setAnswered(false); setFinished(false); }} style={{ flex: 1, padding: "14px", background: "#fff", border: `2px solid ${mod.color}`, borderRadius: 14, color: mod.color, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>🔄 Repetir</button>
            <button onClick={() => onNavigate("module", moduleId)} style={{ flex: 1, padding: "14px", background: mod.color, border: "none", borderRadius: 14, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>← Volver</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header title={mod.quiz.title} subtitle={`Pregunta ${currentQ + 1} de ${mod.quiz.questions.length}`} showBack onBack={() => onNavigate("module", moduleId)} />
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>{mod.quiz.questions.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= currentQ ? mod.color : "#e8e4f0" }} />)}</div>
        <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(108,60,225,0.08)" }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 20px", lineHeight: 1.5, fontFamily: "'Quicksand', sans-serif" }}>{q.q}</p>
          {q.options.map((opt, idx) => {
            let bg = "#f8f6ff", bdr = "2px solid transparent";
            if (answered) { if (idx === q.correct) { bg = "#10B98118"; bdr = "2px solid #10B981"; } else if (idx === selected) { bg = "#EF444418"; bdr = "2px solid #EF4444"; } }
            return <button key={idx} onClick={() => handleAnswer(idx)} style={{ width: "100%", padding: "14px 16px", background: bg, border: bdr, borderRadius: 14, marginBottom: 10, cursor: answered ? "default" : "pointer", textAlign: "left", fontSize: 14, fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>{opt}</button>;
          })}
          {answered && <div style={{ marginTop: 12, padding: 14, borderRadius: 14, background: selected === q.correct ? "#10B98112" : "#F59E0B12" }}><p style={{ fontSize: 13, margin: 0, fontWeight: 600 }}>{selected === q.correct ? "🎉 ¡Correcto!" : `💡 Respuesta: ${q.options[q.correct]}`}</p></div>}
        </div>
        {answered && <button onClick={handleNext} style={{ width: "100%", marginTop: 20, padding: "16px", background: mod.color, color: "#fff", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>{currentQ < mod.quiz.questions.length - 1 ? "Siguiente →" : "Ver resultado 🏆"}</button>}
      </div>
    </div>
  );
}

// ─── LIBRARY & COMMUNITY ─────────────────────────────────────

function LibraryScreen() {
  const [filter, setFilter] = useState("Todos");
  const cats = ["Todos", "Guía", "Plantilla", "Infografía", "Referencia", "Video"];
  const filtered = filter === "Todos" ? LIBRARY_ITEMS : LIBRARY_ITEMS.filter(i => i.category === filter);
  return (
    <div>
      <Header title="Biblioteca" subtitle="Material descargable" />
      <div style={{ padding: "16px 20px 100px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>{cats.map(cat => <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: filter === cat ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "#f0ecff", color: filter === cat ? "#fff" : COLORS.primary, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Quicksand', sans-serif" }}>{cat}</button>)}</div>
        {filtered.map(item => (
          <div key={item.id} style={{ background: "#fff", borderRadius: 20, padding: 18, marginBottom: 14, boxShadow: "0 4px 20px rgba(108,60,225,0.06)", display: "flex", gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, margin: "0 0 4px", fontFamily: "'Quicksand', sans-serif" }}>{item.title}</p>
              <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "0 0 10px", lineHeight: 1.4 }}>{item.description}</p>
              <button style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: item.color, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📥 Descargar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityScreen() {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [newPost, setNewPost] = useState("");
  const [liked, setLiked] = useState({});
  return (
    <div>
      <Header title="Comunidad" subtitle="Conecta con docentes" />
      <div style={{ padding: "16px 20px 100px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 16, marginBottom: 20, boxShadow: "0 4px 20px rgba(108,60,225,0.06)" }}>
          <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Comparte una experiencia o pregunta..." style={{ width: "100%", minHeight: 70, border: "2px solid #f0ecff", borderRadius: 14, padding: 14, fontSize: 14, fontFamily: "'Quicksand', sans-serif", resize: "vertical", outline: "none", boxSizing: "border-box", background: "#faf9ff" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button onClick={() => { if (newPost.trim()) { setPosts([{ id: Date.now(), user: "Tú", avatar: "🧑‍🏫", role: "Docente · IAula", time: "Ahora", content: newPost, likes: 0, replies: 0, tag: "💬 Nuevo" }, ...posts]); setNewPost(""); }}} style={{ padding: "10px 24px", borderRadius: 12, border: "none", background: newPost.trim() ? "linear-gradient(135deg, #6C3CE1, #3B82F6)" : "#e0dbe8", color: "#fff", fontSize: 13, fontWeight: 700, cursor: newPost.trim() ? "pointer" : "default" }}>Publicar ✨</button>
          </div>
        </div>
        {posts.map(post => (
          <div key={post.id} style={{ background: "#fff", borderRadius: 20, padding: 18, marginBottom: 14, boxShadow: "0 4px 20px rgba(108,60,225,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#6C3CE115", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{post.avatar}</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 700, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{post.user}</p><p style={{ fontSize: 11, color: COLORS.textSecondary, margin: 0 }}>{post.time}</p></div>
              <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.primary, background: "#f0ecff", padding: "4px 8px", borderRadius: 8 }}>{post.tag}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.textPrimary, margin: "0 0 12px", fontFamily: "'Quicksand', sans-serif" }}>{post.content}</p>
            <button onClick={() => { setLiked(l => ({ ...l, [post.id]: !l[post.id] })); }} style={{ background: liked[post.id] ? "#FF6B9D15" : "#f8f6ff", border: "none", borderRadius: 10, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: liked[post.id] ? "#FF6B9D" : COLORS.textSecondary, fontWeight: 600 }}>{liked[post.id] ? "❤️" : "🤍"} {post.likes + (liked[post.id] ? 1 : 0)}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────

function ProfileScreen({ progress, profile, onLogout }) {
  const totalCaps = MODULES.filter(m => !m.locked).reduce((a, m) => a + m.capsules.length, 0);
  const doneCaps = Object.values(progress.capsules || {}).filter(Boolean).length;
  const quizzes = Object.keys(progress.quizzes || {}).length;
  return (
    <div>
      <Header title="Mi Perfil" subtitle="Tu progreso en IAula" />
      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(108,60,225,0.08)", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px", background: "linear-gradient(135deg, #6C3CE1, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>🧑‍🏫</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.textPrimary, margin: "0 0 4px", fontFamily: "'Quicksand', sans-serif" }}>{profile?.full_name || "Docente"}</h2>
          <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: 0, fontFamily: "'Quicksand', sans-serif" }}>{profile?.estado && `📍 ${profile.estado}`} {profile?.escuela && `· ${profile.escuela}`}</p>
          <p style={{ fontSize: 12, color: COLORS.primary, margin: "4px 0 0", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>{profile?.nivel_educativo || ""}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
          {[{ label: "Cápsulas", value: `${doneCaps}/${totalCaps}`, icon: "📖", color: "#6C3CE1" }, { label: "Quizzes", value: `${quizzes}/${MODULES.filter(m => m.quiz).length}`, icon: "🧩", color: "#3B82F6" }].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 18, padding: 16, textAlign: "center", boxShadow: "0 4px 16px rgba(108,60,225,0.06)" }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <p style={{ fontSize: 18, fontWeight: 800, color: s.color, margin: "6px 0 2px", fontFamily: "'Quicksand', sans-serif" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: 0, fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: "100%", marginTop: 24, padding: "14px", background: "#FEE2E2", border: "none", borderRadius: 14, color: "#DC2626", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Quicksand', sans-serif" }}>🚪 Cerrar sesión</button>
        <p style={{ textAlign: "center", fontSize: 11, color: COLORS.textSecondary, marginTop: 16, fontFamily: "'Quicksand', sans-serif" }}>💜 IAula - IA educativa para Venezuela 🇻🇪</p>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────

export default function IAulaApp() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("home");
  const [moduleId, setModuleId] = useState(null);
  const [capsuleId, setCapsuleId] = useState(null);
  const [progress, setProgress] = useState({ capsules: {}, quizzes: {} });
  const scrollRef = useRef(null);

  // Check auth on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) loadProfile(session.user.id);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) loadProfile(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
    // Load progress
    const { data: prog } = await supabase.from('progress').select('capsule_id').eq('user_id', userId);
    if (prog) {
      const caps = {};
      prog.forEach(p => { caps[p.capsule_id] = true; });
      setProgress(prev => ({ ...prev, capsules: caps }));
    }
    // Load quiz results
    const { data: quizData } = await supabase.from('quiz_results').select('module_id, score').eq('user_id', userId);
    if (quizData) {
      const quizzes = {};
      quizData.forEach(q => { quizzes[q.module_id] = q.score; });
      setProgress(prev => ({ ...prev, quizzes }));
    }
  };

  const handleCompleteCapsule = async (capId, modId) => {
    setProgress(p => ({ ...p, capsules: { ...p.capsules, [capId]: true } }));
    if (user) {
      await supabase.from('progress').upsert({ user_id: user.id, capsule_id: capId, module_id: modId }, { onConflict: 'user_id,capsule_id' });
    }
  };

  const handleQuizComplete = async (modId, score, total) => {
    setProgress(p => ({ ...p, quizzes: { ...p.quizzes, [modId]: score } }));
    if (user) {
      await supabase.from('quiz_results').insert({ user_id: user.id, module_id: modId, score, total_questions: total });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setProfile(null);
    setProgress({ capsules: {}, quizzes: {} });
    setScreen("home");
  };

  const navigate = (target, modId, capId) => {
    if (target === "module") { setScreen("module"); setModuleId(modId); }
    else if (target === "capsule") { setScreen("capsule"); setModuleId(modId); setCapsuleId(capId); }
    else if (target === "quiz") { setScreen("quiz"); setModuleId(modId); }
    else { setScreen(target); }
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const activeNav = ["home", "learn", "library", "community", "profile"].includes(screen) ? screen : ["module", "capsule", "quiz"].includes(screen) ? "learn" : "home";

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #6C3CE1, #3B82F6, #8B5CF6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 50, marginBottom: 16 }}>🤖</div>
      <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, fontFamily: "'Quicksand', sans-serif" }}>Cargando IAula...</p>
    </div>
  );

  if (!user) return (
    <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "'Quicksand', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } body { margin: 0; background: #f8f6ff; }`}</style>
      <AuthScreen onAuth={(u) => { setUser(u); loadProfile(u.id); }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f8f6ff", fontFamily: "'Quicksand', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; background: #f8f6ff; }
        ::-webkit-scrollbar { width: 0; }
        button:active { transform: scale(0.97) !important; }
      `}</style>
      <div ref={scrollRef} style={{ height: "100vh", overflowY: "auto", paddingBottom: 80, WebkitOverflowScrolling: "touch" }}>
        {screen === "home" && <HomeScreen onNavigate={navigate} progress={progress} profile={profile} />}
        {screen === "learn" && <LearnScreen onNavigate={navigate} progress={progress} />}
        {screen === "module" && <ModuleScreen moduleId={moduleId} onNavigate={navigate} progress={progress} />}
        {screen === "capsule" && <CapsuleScreen moduleId={moduleId} capsuleId={capsuleId} onNavigate={navigate} progress={progress} onComplete={handleCompleteCapsule} />}
        {screen === "quiz" && <QuizScreen moduleId={moduleId} onNavigate={navigate} progress={progress} onQuizComplete={handleQuizComplete} />}
        {screen === "library" && <LibraryScreen />}
        {screen === "community" && <CommunityScreen />}
        {screen === "profile" && <ProfileScreen progress={progress} profile={profile} onLogout={handleLogout} />}
      </div>
      <BottomNav active={activeNav} onNavigate={navigate} />
    </div>
  );
}
