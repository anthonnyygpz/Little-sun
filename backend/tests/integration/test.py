from pydantic import BaseModel, Field
from typing import Optional


class Modelo(BaseModel):
    phone_number: Optional[str] = Field(
        None,
    )


# Ejemplos de uso
modelo1 = Modelo(phone_number="5512345678")
modelo2 = Modelo(phone_number=None)
modelo3 = Modelo(phone_number="")

print(modelo1)
print(modelo2)
print(modelo3)

try:
    Modelo(phone_number="123")
except Exception as e:
    print(e)
