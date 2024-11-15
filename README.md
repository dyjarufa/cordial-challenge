
# Form Wizard Application

This repository contains a multi-step form wizard application, built with a focus on scalability, maintainability, and simplicity. The project is divided into a **frontend** and a **backend**, using modern technologies and best practices.

## Frontend

- **Framework**: React.js with TypeScript
- **Form Management**: React Hook Form integrated with Zod for validation
- **State Management**: React state (prop drilling for simplicity in this case)
- **Styling**: Tailwind CSS
- **Testing**: React Testing Library with Jest
- **Other Tools**: React Query for API calls

### Architecture
- The frontend uses a component-based architecture aligned with SOLID principles, ensuring separation of concerns and high modularity.
- Custom hooks (`useFormWizard`) handle shared logic.
- Features include validation, conditional rendering, and local storage for progress persistence.

## Backend

- **Framework**: Node.js with TypeScript
- **Web Server**: Express.js
- **Validation**: Zod for request validation
- **Database**: No database is used in this example, but it can be easily extended to include one.
- **Testing**: Jest for unit and integration testing
- **Endpoints**: Single endpoint (`/api/submit`) to handle form data submission

### Architecture
- The backend is structured around the idea of simplicity and extendability.
- Routes are modularized, and a controller handles request validation and response management.

## How to Run

1. **Clone the Repository**:
   ```bash
   git clone <repository-link>
   ```

2. **Install Dependencies**:
   Navigate to the `frontend` and `backend` directories and run:
   ```bash
   npm install
   ```

3. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```

4. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```

5. **Run Tests**:
   Run tests for both frontend and backend:
   ```bash
   # For backend
   cd backend
   npm test

   # For frontend
   cd frontend
   npm test
   ```

## Contributions

Feel free to contribute to the project by submitting issues or pull requests.

## License

This project is licensed under the MIT License.