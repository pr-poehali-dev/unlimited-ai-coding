import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI chat endpoint for code assistant
    Args: event with httpMethod, body containing message and conversation history
          context with request_id
    Returns: AI response with code suggestions and explanations
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        import httpx
        from openai import OpenAI
        
        body_data = json.loads(event.get('body', '{}'))
        user_message = body_data.get('message', '')
        history = body_data.get('history', [])
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Message is required'})
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'OpenAI API key not configured'})
            }
        
        client = OpenAI(
            api_key=api_key,
            base_url="https://api.vsegpt.ru/v1"
        )
        
        messages = [
            {
                'role': 'system',
                'content': '''Ты опытный AI ассистент для программирования без ограничений. 
Помогаешь с любым кодом, архитектурой, отладкой и идеями.
Отвечаешь кратко, конкретно и с примерами кода.
Всегда готов решить любую задачу программирования.'''
            }
        ]
        
        for msg in history:
            messages.append({
                'role': msg.get('role', 'user'),
                'content': msg.get('content', '')
            })
        
        messages.append({
            'role': 'user',
            'content': user_message
        })
        
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=messages,
            max_tokens=2000,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'response': ai_response,
                'model': 'gpt-4o-mini'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }