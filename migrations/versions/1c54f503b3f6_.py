"""empty message

Revision ID: 1c54f503b3f6
Revises: 38f88f6d8a0b
Create Date: 2023-11-30 21:02:35.774295

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c54f503b3f6'
down_revision = '38f88f6d8a0b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('salary', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pdf', sa.String(length=200), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('salary', schema=None) as batch_op:
        batch_op.drop_column('pdf')

    # ### end Alembic commands ###
