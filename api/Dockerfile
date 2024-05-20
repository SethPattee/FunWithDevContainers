FROM almalinux:8

RUN dnf -y install \
  https://download.oracle.com/otn_software/linux/instantclient/213000/oracle-instantclient-basic-21.3.0.0.0-1.el8.x86_64.rpm \
  python38 \
  python38-pip \
  gcc \
  poppler-utils \
  python38-devel \
  openldap-devel && \
  rm -rf /var/cache/yum && \
  pip3 install --upgrade pip

WORKDIR /app

COPY ./requirements.txt requirements.txt

# pyparsing needs to be in place before latest
RUN pip3 install -r requirements.txt

COPY ./src src
COPY ./conftest.py conftest.py
COPY ./nolij_import nolij_import
EXPOSE 5000
CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
