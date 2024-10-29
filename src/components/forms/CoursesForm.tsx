import {} from "react-hook-form";
function CoursesForm() {
  return (
    <section className="flex flex-col gap-4 p-4 justify-center items-center">
      <form className="flex flex-col gap-4 p-4 justify-center max-w-screen-xl ">
        <h1 className="text-4xl font-bold">Formulario de cursos</h1>
        <label htmlFor="name" className="text-blue-900 font-semibold">
          Nombre del curso
        </label>
        <input
          type="text"
          placeholder="Ej. Programación"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />
        <label htmlFor="description" className="text-blue-900 font-semibold">
          Descripción del curso
        </label>
        <textarea
          placeholder="Ej. Curso de programación para principiantes"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        ></textarea>
        <label htmlFor="startDate" className="text-blue-900 font-semibold">
          Fecha de inicio
        </label>
        <input
          type="date"
          placeholder="Fecha de inicio"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />
        <label htmlFor="endDate" className="text-blue-900 font-semibold">
          Fecha de finalización
        </label>
        <input
          type="date"
          placeholder="Fecha de finalización"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        />
        <label htmlFor="coach" className="text-blue-900 font-semibold">
          Instructor del curso
        </label>
        <select
          name="coach"
          id="coach"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="1">Ivan le Roux</option>
          <option value="2">John Doe</option>
        </select>
        <label htmlFor="department" className="text-blue-900 font-semibold">
          ¿Quién toma el curso?
        </label>
        <select
          name="department"
          id="department"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="1">Pablo Lima</option>
          <option value="2">Ana Torres</option>
          <option value="3">Juan Perez</option>
        </select>
        <div className="flex justify-between">
          <label htmlFor="approved" className="text-blue-900 font-semibold">
            ¿Aprobado?
          </label>
          <input
            type="checkbox"
            name="approved"
            id="approved"
            className="w-5 border-2 border-blue-200 p-2 rounded-md"
          />
        </div>
        <label htmlFor="place" className="text-blue-900 font-semibold">
          Lugar donde se llevará a cabo el curso
        </label>
        <select
          name="place"
          id="place"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="1">En línea</option>
          <option value="2">Sucursal uno</option>
          <option value="3">Sucursal dos</option>
          <option value="4">Planta principal</option>
          <option value="5">Sucursal Mexico</option>
        </select>
        <button className="bg-blue-900 mt-8 text-white rounded-md p-2 text-lg hover:bg-opacity-85 transition-all duration-300">
          Guardar
        </button>
      </form>
    </section>
  );
}

export default CoursesForm;
