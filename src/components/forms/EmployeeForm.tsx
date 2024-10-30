import { useState } from "react";
interface EmployeeFormProps {
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

function EmployeeForm() {
  const [formData, setFormData] = useState<EmployeeFormProps>({
    employeeNumber: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    area: "",
  });
  const { employeeNumber, name, firstName, lastName, email, area } =
    formData;
  const fetchData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allData = {
      employeeNumber,
      name,
      firstName,
      lastName,
      email,
      area
    };
    console.log(allData);
    try {
      const response = await fetch("http://localhost:3000/api/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setFormData({
        employeeNumber: "",
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        area: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="flex flex-col gap-4 p-4 justify-center items-center">
      <form className="flex flex-col gap-4 p-4 justify-center max-w-screen-xl"
        onSubmit={fetchData}>
        <h1 className="text-4xl font-bold">Formulario de empleados</h1>
        <label htmlFor="employeeNumber" className="text-blue-900 font-semibold">
          N° de empleado
        </label>
        <input
          type="text"
          placeholder="Ej. 12345678"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
          value={employeeNumber}
        />

        <label htmlFor="name" className="text-blue-900 font-semibold">
          Nombre del empleado
        </label>
        <input
          type="text"
          placeholder="Ej. Ivan"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={name}
        />
        <label htmlFor="firstName" className="text-blue-900 font-semibold">
          Primer Apellido
        </label>
        <input
          type="text"
          placeholder="Ej. le Roux"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          value={firstName}
        />
        <label htmlFor="lastName" className="text-blue-900 font-semibold">
          Segundo Apellido
        </label>
        <input
          type="text"
          placeholder="Ej. Perez"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          value={lastName}
        />

        <label htmlFor="coach" className="text-blue-900 font-semibold">
          Área en donde desempeña
        </label>
        <select
          name="department"
          id="department"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          value={area}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="Marketing">Marketing</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Diseño">Diseño</option>
        </select>

        <label htmlFor="email" className="text-blue-900 font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="Ej. ivan@gmail.com"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={email}
        />

        <button className="bg-blue-900 mt-8 text-white rounded-md p-2 text-lg hover:bg-opacity-85 transition-all duration-300">
          Guardar
        </button>
      </form>
    </section>
  );
}

export default EmployeeForm;
