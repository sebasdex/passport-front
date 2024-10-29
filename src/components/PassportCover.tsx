function PassportCover() {
  const WorldIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.7"
      stroke="currentColor"
      className="size-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
  return (
    <>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Employee Passport</h1>
          <p className="text-xl text-blue-200 mt-1">PassportCourses</p>
        </div>
        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900">
          {WorldIcon}
        </div>
      </header>
      <article className="flex flex-col gap-4 p-4 justify-center items-center">
        <img
          src="https://picsum.photos/id/1003/200/300"
          alt="employee"
          className="rounded-full h-40 w-40 object-cover object-bottom border-4 border-yellow-400"
        />
        <h2 className="text-4xl font-bold mt-4">Jane Doe</h2>
        <p className="text-xl text-blue-200 -mt-2">EMP12345</p>
        <p className="text-lg text-blue-200 -mt-3">Marketing</p>
        <span className="text-xl text-blue-200 italic mt-6">
          Embark on your global learning journey
        </span>
      </article>
      <div className="text-blue-200 text-sm self-end text-right">
        <p>Issue Date: 2023-01-01</p>
        <p>Expiration Date: 2023-01-31</p>
      </div>
    </>
  );
}

export default PassportCover;
