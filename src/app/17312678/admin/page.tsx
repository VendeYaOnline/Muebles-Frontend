import DashBoard from "@/app/dashboard/Dashboard";

const Admin = () => {
  return (
    <section>
      <div className="warning-view">
        <h1>Vista no disponible en dispositivos pequeños</h1>
        <p>
          Esta vista está diseñada para disfrutarse en pantallas más grandes.
          Por favor, accede desde un dispositivo con mayor resolución para una
          mejor experiencia. ¡Gracias por tu comprensión!
        </p>
      </div>

      <DashBoard />
    </section>
  );
};

export default Admin;
