from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = ""
    DATABASE_URL: str = ""
    API_VERSION_STR: str = ""

    SECRET_KEY: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRATION_MINUTES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
