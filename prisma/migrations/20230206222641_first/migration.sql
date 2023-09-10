-- CreateTable
CREATE TABLE Account (
    id VARCHAR(191) NOT NULL,
    user_id VARCHAR(191) NOT NULL,
    type VARCHAR(191) NOT NULL,
    provider VARCHAR(191) NOT NULL,
    provider_account_id VARCHAR(191) NOT NULL,
    refresh_token VARCHAR(191),
    access_token VARCHAR(191),
    expires_at INT,
    token_type VARCHAR(191),
    scope VARCHAR(191),
    id_token VARCHAR(191),
    session_state VARCHAR(191),

    CONSTRAINT Account_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Session (
    id VARCHAR(191) NOT NULL,
    session_token VARCHAR(191) NOT NULL,
    userId VARCHAR(191) NOT NULL,
    expires DATETIME(3) NOT NULL,

    CONSTRAINT Session_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE User (
    id VARCHAR(191) NOT NULL,
    name VARCHAR(191),
    email VARCHAR(191),
    email_verified DATETIME(3),
    password VARCHAR(191),
    role ENUM('admin', 'participant') NOT NULL,

    CONSTRAINT User_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE VerificationToken (
    identifier VARCHAR(191) NOT NULL,
    token VARCHAR(191) NOT NULL,
    expires DATETIME(3) NOT NULL
);

-- CreateTable
CREATE TABLE Todo (
    id VARCHAR(191) NOT NULL,
    description VARCHAR(191) NOT NULL,
    status ENUM('new', 'approved', 'archived') NOT NULL DEFAULT 'new',
    submission_date DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME(3) NOT NULL,
    title VARCHAR(191) NOT NULL,

    CONSTRAINT Todo_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE TodoDataType (
    id VARCHAR(191) NOT NULL,
    nodeId VARCHAR(191) NOT NULL,
    position INT NOT NULL,
    value ENUM('analyses', 'healthRecords', 'geneticData', 'specimens') NOT NULL,

    CONSTRAINT TodoDataType_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Avatar (
    todo_id VARCHAR(191),
    user_id VARCHAR(191),
    image_id VARCHAR(191) NOT NULL,
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT Avatar_pkey PRIMARY KEY (image_id)
);

-- CreateTable
CREATE TABLE CoordinatorsOnTodos (
    todo_id VARCHAR(191) NOT NULL,
    user_id VARCHAR(191) NOT NULL,
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT CoordinatorsOnTodos_pkey PRIMARY KEY (todo_id,user_id)
);

-- CreateTable
CREATE TABLE ParticipantsOnTodos (
    todo_id VARCHAR(191) NOT NULL,
    participant_id VARCHAR(191) NOT NULL,
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ParticipantsOnTodos_pkey PRIMARY KEY (todo_id,participant_id)
);

-- CreateTable
CREATE TABLE Document (
    id VARCHAR(191) NOT NULL,
    uploaded_by_id VARCHAR(191),
    name VARCHAR(191) NOT NULL,
    url VARCHAR(191) NOT NULL,
    file_type VARCHAR(191) NOT NULL,
    todo_id VARCHAR(191),
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT Document_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE NotificationEvent (
    id VARCHAR(191) NOT NULL,
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notification_type VARCHAR(191) NOT NULL,
    body JSON NOT NULL,

    CONSTRAINT NotificationEvent_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE EventLog (
    id VARCHAR(191) NOT NULL,
    model VARCHAR(191) NOT NULL,
    method_type ENUM('get', 'post', 'put', 'patch', 'delete') NOT NULL,
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    body JSON,
    user_id VARCHAR(191),

    CONSTRAINT EventLog_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE EventRecordId (
    id VARCHAR(191) NOT NULL,
    nodeId VARCHAR(191) NOT NULL,
    position INT NOT NULL,
    value VARCHAR(191) NOT NULL,

    CONSTRAINT EventRecordId_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Participant (
    id VARCHAR(191) NOT NULL,
    inserted_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(191) NOT NULL,
    enrolled_tribe VARCHAR(191),
    home_phone VARCHAR(191),
    work_phone VARCHAR(191),
    physical_address VARCHAR(191),
    emergency_contact_name VARCHAR(191),
    emergency_contact_relationship VARCHAR(191),
    emergency_contact_email VARCHAR(191),
    emergency_contact_home_phone VARCHAR(191),
    emergency_contact_work_phone VARCHAR(191),
    emergency_contact_physical_address VARCHAR(191),

    CONSTRAINT Participant_pkey PRIMARY KEY (id)
);

-- CreateIndex
CREATE UNIQUE INDEX Account_provider_provider_account_id_key ON Account(provider, provider_account_id);

-- CreateIndex
CREATE UNIQUE INDEX Session_session_token_key ON Session(session_token);

-- CreateIndex
CREATE UNIQUE INDEX User_email_key ON User(email);

-- CreateIndex
CREATE UNIQUE INDEX VerificationToken_token_key ON VerificationToken(token);

-- CreateIndex
CREATE UNIQUE INDEX VerificationToken_identifier_token_key ON VerificationToken(identifier, token);

-- CreateIndex
CREATE UNIQUE INDEX Avatar_todo_id_key ON Avatar(todo_id);

-- CreateIndex
CREATE UNIQUE INDEX Avatar_user_id_key ON Avatar(user_id);

-- CreateIndex
CREATE UNIQUE INDEX Participant_user_id_key ON Participant(user_id);

-- AddForeignKey
ALTER TABLE Account ADD CONSTRAINT Account_user_id_fkey FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Session ADD CONSTRAINT Session_userId_fkey FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Avatar ADD CONSTRAINT Avatar_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES Todo(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Avatar ADD CONSTRAINT Avatar_user_id_fkey FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Avatar ADD CONSTRAINT Avatar_image_id_fkey FOREIGN KEY (image_id) REFERENCES Document(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE CoordinatorsOnTodos ADD CONSTRAINT CoordinatorsOnTodos_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES Todo(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE CoordinatorsOnTodos ADD CONSTRAINT CoordinatorsOnTodos_user_id_fkey FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE ParticipantsOnTodos ADD CONSTRAINT ParticipantsOnTodos_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES Todo(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE ParticipantsOnTodos ADD CONSTRAINT ParticipantsOnTodos_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES Participant(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Document ADD CONSTRAINT Document_uploaded_by_id_fkey FOREIGN KEY (uploaded_by_id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Document ADD CONSTRAINT Document_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES Todo(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Participant ADD CONSTRAINT Participant_user_id_fkey FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE RESTRICT ON UPDATE CASCADE;
