User Access: The user interacts with the application by accessing pages like the AdminDashboard, Doctor Dashboard, or Appointment booking interface.

Routing: The user's action is captured by the application and routed to the appropriate Thymeleaf (MVC) or REST controller based on the request type.

Service Invocation: The controller processes the initial request and calls the specific service layer responsible for that module's business logic.

Business Logic Execution: The service layer executes necessary validations and determines which data source (MySQL or MongoDB) is required for the operation.

Data Access: The service layer calls the repository interface, which interacts with either the JPA layer for relational data or the Mongo repository for prescription documents.

Data Retrieval/Storage: The database performs the requested operation (Create, Read, Update, or Delete) and returns the resulting data back up through the repository and service layers.

Response Rendering: The controller receives the final data and either renders a Thymeleaf view for the browser or returns a JSON response to the client.
