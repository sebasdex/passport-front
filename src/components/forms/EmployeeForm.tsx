function EmployeeForm() {
  return (
    <section className="flex flex-col gap-4 p-4 justify-center items-center">
      <form className="flex flex-col gap-4 p-4 justify-center max-w-screen-xl ">
        <h1 className="text-4xl font-bold">Formulario de empleados</h1>
        <label htmlFor="employeeNumber" className="text-blue-900 font-semibold">
          N° de empleado
        </label>
        <input
          type="text"
          placeholder="Ej. 12345678"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />

        <label htmlFor="name" className="text-blue-900 font-semibold">
          Nombre del empleado
        </label>
        <input
          type="text"
          placeholder="Ej. Ivan"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />
        <label htmlFor="firstName" className="text-blue-900 font-semibold">
          Primer Apellido
        </label>
        <input
          type="text"
          placeholder="Ej. le Roux"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />
        <label htmlFor="lastName" className="text-blue-900 font-semibold">
          Segundo Apellido
        </label>
        <input
          type="text"
          placeholder="Ej. Perez"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />

        <label htmlFor="coach" className="text-blue-900 font-semibold">
          Área en donde desempeña
        </label>
        <select
          name="department"
          id="department"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="1">Marketing</option>
          <option value="2">Finanzas</option>
          <option value="3">Desarrollo</option>
          <option value="4">Diseño</option>
        </select>

        <button className="bg-blue-900 mt-8 text-white rounded-md p-2 text-lg hover:bg-opacity-85 transition-all duration-300">
          Guardar
        </button>
      </form>
    </section>
  );
}

export default EmployeeForm;
