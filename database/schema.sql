CREATE TABLE mps (
    mp_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    constituency TEXT NOT NULL,
    state TEXT NOT NULL
);

CREATE TABLE agencies (
    agency_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    registration_type TEXT
);

CREATE TABLE works (
    work_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    sanctioned_amount REAL NOT NULL,
    sanction_date DATE NOT NULL,
    status TEXT NOT NULL,
    location_lat REAL,
    location_lon REAL,
    mp_id INTEGER,
    agency_id INTEGER,
    FOREIGN KEY(mp_id) REFERENCES mps(mp_id),
    FOREIGN KEY(agency_id) REFERENCES agencies(agency_id)
);
