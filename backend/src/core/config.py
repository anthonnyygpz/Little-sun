from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = ""
    DATABASE_URL: str = (
        "postgresql+psycopg2://postgres:antony15@0.0.0.0:5432/little_sun "
    )
    API_VERSION_STR: str = ""

    SECRET_KEY: str = ""
    REFRESH_TOKEN_SECRET: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRATION_MINUTES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
