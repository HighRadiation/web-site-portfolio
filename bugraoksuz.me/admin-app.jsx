// ============================================
// Admin app — root router
// ============================================
const { useState: useAS } = React;

function AdminApp() {
  const [authed, setAuthed] = useAS(false);
  const [route, setRoute] = useAS("dashboard");

  if (!authed) return <AdminLogin onSubmit={() => setAuthed(true)} />;

  const sidebarMap = {
    dashboard: "dashboard",
    projects: "projects", "project-new": "projects", "project-edit": "projects",
    skills: "skills", "skill-new": "skills",
    timeline: "timeline", "timeline-new": "timeline",
    messages: "messages",
  };

  function screen() {
    switch (route) {
      case "dashboard": return <Dashboard onNav={setRoute} />;
      case "projects": return <ProjectsList onNav={setRoute} />;
      case "project-new": return <ProjectForm onNav={setRoute} editing={false} />;
      case "project-edit": return <ProjectForm onNav={setRoute} editing={true} />;
      case "skills": return <SkillsList onNav={setRoute} />;
      case "skill-new": return <SkillForm onNav={setRoute} />;
      case "timeline": return <TimelineList onNav={setRoute} />;
      case "timeline-new": return <TimelineForm onNav={setRoute} />;
      case "messages": return <Messages onNav={setRoute} />;
      default: return <Dashboard onNav={setRoute} />;
    }
  }

  return (
    <div className="admin-layout">
      <Sidebar active={sidebarMap[route]} onNav={setRoute} unread={2} />
      <main className="main">
        {screen()}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
