import sqlite3
import json

def query_database(sql_query: str) -> str:
    conn = sqlite3.connect('database/mplads.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    try:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
        return json.dumps([dict(row) for row in rows])
    except Exception as e:
        return json.dumps({'error': str(e)})
    finally:
        conn.close()
