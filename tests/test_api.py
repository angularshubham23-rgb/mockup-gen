import requests
import json

def test_generate_endpoint():
    url = 'http://localhost:4000/api/mockup/generate'
    payload = { 'query': 'Simple login screen' }
    r = requests.post(url, json=payload, timeout=5)
    assert r.status_code == 200
    j = r.json()
    assert 'spec' in j and isinstance(j['spec'], dict)
