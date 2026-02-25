-- CreateTable
CREATE TABLE "Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leadId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "replied" BOOLEAN NOT NULL DEFAULT false,
    "nps" INTEGER,
    "experience" TEXT,
    "satisfaction" TEXT,
    "q1" TEXT,
    "q2" TEXT,
    "q3" TEXT,
    "q5" TEXT,
    "q6" TEXT,
    "q7" TEXT,
    "q8" TEXT,
    "q9" TEXT,
    "notes" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Feedback_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_leadId_key" ON "Feedback"("leadId");
