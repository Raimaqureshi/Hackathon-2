import sqlite3 
conn = sqlite3.connect('test.db') 
cursor = conn.cursor() 
 
print('Registered users:') 
cursor.execute('SELECT email, created_at FROM user ORDER BY created_at DESC;') 
users = cursor.fetchall() 
for email, created_at in users: 
    print(f'Email: {email}, Registered: {created_at}') 
 
print(f'\\nTotal users: {len(users)}') 
conn.close() 
conn.close() 
