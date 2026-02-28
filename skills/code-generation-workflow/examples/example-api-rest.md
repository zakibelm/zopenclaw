# Exemple: API REST FastAPI - Gestion Utilisateurs

## Demande Initiale

> Créer une API REST pour la gestion d'utilisateurs avec authentification JWT

---

## Phase 1: Plan Architectural (Architecte - Claude)

### Vue d'Ensemble
API REST complète pour la gestion d'utilisateurs avec:
- CRUD utilisateurs
- Authentification JWT
- Validation des données
- Gestion des rôles

### Structure des Fichiers
```
user_api/
├── app/
│   ├── __init__.py
│   ├── main.py              # Point d'entrée FastAPI
│   ├── config.py            # Configuration (env vars)
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py          # Modèles SQLAlchemy
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── user.py          # Schémas Pydantic
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py          # Routes auth (/login, /register)
│   │   └── users.py         # Routes CRUD users
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py  # Logique auth
│   │   └── user_service.py  # Logique métier
│   └── utils/
│       ├── __init__.py
│       └── security.py      # JWT, hash passwords
├── tests/
│   ├── __init__.py
│   ├── test_auth.py
│   └── test_users.py
├── requirements.txt
└── .env.example
```

### Architecture Détaillée

#### app/main.py
- **Responsabilité:** Configuration FastAPI, montage des routers
- **Interface:** Application ASGI
- **Dépendances:** FastAPI, routers internes

#### app/models/user.py
- **Responsabilité:** Modèle SQLAlchemy User
- **Interface:** Classe User avec méthodes helper
- **Champs:** id, email, hashed_password, role, created_at, updated_at

#### app/schemas/user.py
- **Responsabilité:** Validation entrées/sorties
- **Interfaces:** UserCreate, UserResponse, UserUpdate

#### app/utils/security.py
- **Responsabilité:** Hash passwords, JWT encode/decode
- **Interface:** hash_password(), verify_password(), create_token(), decode_token()

### Dépendances
```json
{
  "production": [
    "fastapi",
    "uvicorn",
    "sqlalchemy",
    "pydantic[email]",
    "passlib[bcrypt]",
    "python-jose[cryptography]",
    "python-multipart"
  ],
  "development": [
    "pytest",
    "pytest-asyncio",
    "httpx",
    "python-dotenv"
  ]
}
```

### Considérations de Sécurité
- ✅ Hash bcrypt pour les mots de passe (jamais en clair)
- ✅ JWT avec expiration et secret fort
- ✅ Validation email côté serveur
- ✅ Protection contre injection SQL (SQLAlchemy ORM)
- ✅ CORS configuré restrictivement

### Plan d'Implémentation
1. [ ] Configurer structure projet + requirements
2. [ ] Implémenter modèles SQLAlchemy
3. [ ] Créer schémas Pydantic
4. [ ] Implémenter utils/security (JWT, hash)
5. [ ] Créer services métier
6. [ ] Implémenter routers auth + users
7. [ ] Assembler dans main.py
8. [ ] Écrire tests

---

## Phase 2: Code Généré (Exécutant - Qwen Coder)

### Fichier: app/utils/security.py
```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

# Configuration
SECRET_KEY = "votre-secret-key-tres-securisee-a-changer"  # Via env var en prod
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifie si le mot de passe correspond au hash."""
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password: str) -> str:
    """Hash un mot de passe avec bcrypt."""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Crée un JWT token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> Optional[dict]:
    """Décode et vérifie un JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
```

### Fichier: app/models/user.py
```python
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

*(Autres fichiers générés selon le plan...)*

---

## Phase 3: Revue (Superviseur - Claude)

### Score Global: 8.5/10

| Critère | Score |
|---------|-------|
| Conformité | 9/10 |
| Qualité | 8/10 |
| Sécurité | 8/10 |
| Performance | 9/10 |

### Statut: ✅ APPROUVÉ (avec suggestions)

### Points Positifs
- ✅ Code propre et bien structuré
- ✅ Fonctions courtes et focalisées
- ✅ Hash bcrypt correctement utilisé
- ✅ JWT avec expiration

### Problèmes Identifiés

#### 🟡 Moyen: Secret key en dur
**Fichier:** `app/utils/security.py` ligne 7

```python
# AVANT (problématique)
SECRET_KEY = "votre-secret-key-tres-securisee-a-changer"

# APRÈS (corrigé)
import os
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable is required")
```

#### 🟡 Moyen: Manque de gestion d'erreurs JWT
**Fichier:** `app/utils/security.py` fonction `decode_token`

```python
# AMÉLIORATION suggérée
def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token expiré
    except jwt.JWTError:
        return None  # Token invalide
```

### Recommandations Optionnelles
1. Ajouter rate limiting sur les routes auth
2. Implémenter refresh tokens
3. Ajouter logging des tentatives de connexion

---

## Résultat Final

✅ **Workflow terminé avec succès!**

**Temps total:** ~18 secondes  
**Coût estimé:** $0.021 (vs $0.045 standard)

**Fichiers générés:** 12 fichiers prêts à l'emploi

**Prochaines étapes:**
1. Corriger la gestion de SECRET_KEY
2. Ajouter les tests manquants
3. Configurer la base de données
4. Déployer 🚀

---

**Note:** Cet exemple illustre le workflow complet. Le skill code-generation-workflow automatise ce processus.
