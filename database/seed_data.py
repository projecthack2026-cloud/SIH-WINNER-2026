import sqlite3
import os

def setup_db():
    conn = sqlite3.connect('mplads.db')
    cursor = conn.cursor()
    with open('schema.sql', 'r') as f:
        cursor.executescript(f.read())
    print('Database created successfully.')
    # TODO: Add INSERT statements for the contract splitting scenario
    conn.commit()
    conn.close()

if __name__ == '__main__':
    setup_db()
