from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

@app.route('/bfhl', methods=['POST'])
def post_data():
    data = request.json.get('data', [])
    user_id = "john_doe_17091999"
    email = "john@xyz.com"
    roll_number = "ABCD123"
    
    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]
    
    highest_alphabet = []
    if alphabets:
        highest_alphabet = [max(alphabets, key=str.lower)]
    
    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
