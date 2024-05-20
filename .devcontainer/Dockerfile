FROM almalinux:8

RUN dnf -y install \
      openssh-clients \
      tar \
      gzip \
      git \
      nodejs \
      python38 python38-pip \
      gcc \
      python38-devel \
      poppler-utils \
      openldap-devel && \
    rm -rf /var/cache/yum && \
    npm i -g n && \
    n 21

  
RUN groupadd --gid 1000 developer \
    && useradd --uid 1000 --gid 1000 -m developer \
    && chown -R developer. /home/developer

# USER developer
# USER root
# RUN chown -R developer:developer /app/client
USER developer

RUN python3 -m venv /home/developer/.virtualenvs/docstorage \
  && source /home/developer/.virtualenvs/docstorage/bin/activate \
  && pip install --upgrade pip

WORKDIR /app