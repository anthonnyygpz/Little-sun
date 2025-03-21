# Linux

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

#dev
uvircorn main:app --reload

#pro
uvircorn main:app --host 0.0.0.0 --port 8000
